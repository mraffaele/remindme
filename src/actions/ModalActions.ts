import { IReminder, IModal } from "../models";

export enum ModalActionTypes {
  OPEN_MODAL = "OPEN_MODAL",
  OPEN_MODAL_REMINDER = "OPEN_MODAL_REMINDER",
  OPEN_MODAL_AUDIOMANAGER = "OPEN_MODAL_AUDIOMANAGER",
  CLOSE_MODAL = "CLOSE_MODAL"
}

export interface IModalCloseAction {
  type: ModalActionTypes.CLOSE_MODAL;
}

export interface IModalEditReminderAction {
  type: ModalActionTypes.OPEN_MODAL_REMINDER;
  payload: IReminder;
}

export interface IModalAudioManagerAction {
  type: ModalActionTypes.OPEN_MODAL_AUDIOMANAGER;
}

export function editReminderModal(reminder: IReminder): IModalEditReminderAction {
  return {
    type: ModalActionTypes.OPEN_MODAL_REMINDER,
    payload: reminder
  };
}

export function audioManagerModal(): IModalAudioManagerAction {
  return {
    type: ModalActionTypes.OPEN_MODAL_AUDIOMANAGER
  };
}

export function closeModal(): IModalCloseAction {
  return {
    type: ModalActionTypes.CLOSE_MODAL
  };
}
