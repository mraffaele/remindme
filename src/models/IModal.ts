import IReminder from "./IReminder";

export enum ModalTypes {
  ReminderEdit = "ReminderEdit",
  AudioManager = "AudioManager"
}

export default interface IModal {
  isOpen: boolean;
  type: ModalTypes;
  payload?: IReminder;
}
