import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import rootReducers from "./reducers";
import { loadState, saveState } from "./utils/localStorage";
import { audioAsDataUrl } from "./utils/audioAsDataUrl";

require("./sass/index.scss");

const appState = new Promise(loadAppState);
appState.then(restored => {
  const store = createStore(rootReducers, restored);

  //Sub to update localstorage on changes
  store.subscribe(() => {
    const tmpState = store.getState();
    const state = {
      reminders: tmpState.reminders,
      userAudio: tmpState.userAudio.map(track => {
        return {
          filePath: track.filePath,
          id: track.id,
          fileName: track.fileName
        };
      })
    };

    if (state) {
      saveState(state);
    }
  });

  //Inject the Store and start the app
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
});

function loadAppState(resolve, reject) {
  let restored = loadState();
  if (!restored) return resolve(undefined);

  // Restore Reminders, add new session data
  restored.reminders = restored.reminders.map(item => {
    return { ...item, cycles: 0, isRunning: false };
  });

  let audioData;
  if (restored.userAudio && restored.userAudio.length) {
    //Load Restored Audio
    audioData = restored.userAudio.map(track => {
      return new Promise((resolve, reject) => {
        //We want to continue even when it fails in Promise.all (TC39 give me Finally already)
        audioAsDataUrl(track.filePath)
          .then(data => resolve(data))
          .catch(err => resolve(null));
      });
    });
  } else {
    audioData = [Promise.resolve()];
  }

  //When its all good to go
  Promise.all(audioData).then(loadedAudio => {
    restored.userAudio = restored.userAudio.map((track, index) => {
      return { ...track, data: loadedAudio[index] };
    });

    resolve(restored);
  });
}
