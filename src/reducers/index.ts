import { combineReducers } from "redux";
import { RemindersReducer } from "./RemindersReducer";
import { UserAudioReducer } from "./UserAudioReducer";
import { SystemAudioReducer } from "./SystemAudioReducer";
import { ModalReducer } from "./ModalReducer";
import { IAppState } from "../models";

const rootReducer = combineReducers<IAppState>({
  reminders: RemindersReducer,
  userAudio: UserAudioReducer,
  systemAudio: SystemAudioReducer,
  modal: ModalReducer
});

export default rootReducer;
