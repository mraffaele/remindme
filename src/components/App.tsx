import React from "react";
import ReminderList from "../containers/ReminderList";
import Modal from "../containers/Modal";
import MenuController from "../containers/MenuController";

class App extends React.Component {
  render() {
    return (
      <div>
        <MenuController />
        <ReminderList />
        <Modal />
      </div>
    );
  }
}

export default App;
