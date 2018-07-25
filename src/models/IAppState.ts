import IReminder from "../models/IReminder";
import IUserAudioFile from "../models/IUserAudioFile";
import ISystemAudioFile from "../models/ISystemAudioFile";

export default interface IAppState {
  reminders: IReminder[];
  userAudio: IUserAudioFile[];
  systemAudio: ISystemAudioFile[];
  modal: any;
}
