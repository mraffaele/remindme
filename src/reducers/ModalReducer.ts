import { IModal, ModalTypes } from "../models";
import {
  ModalActionTypes,
  IModalCloseAction,
  IModalEditReminderAction,
  IModalAudioManagerAction
} from "../actions/ModalActions";

const initialState: IModal = {
  isOpen: false,
  type: null,
  payload: null
};

export const ModalReducer = (
  state: IModal = initialState,
  action: IModalCloseAction | IModalEditReminderAction | IModalAudioManagerAction
): IModal => {
  switch (action.type) {
    case ModalActionTypes.OPEN_MODAL_REMINDER:
      return {
        isOpen: true,
        type: ModalTypes.ReminderEdit,
        payload: action.payload
      };

    case ModalActionTypes.OPEN_MODAL_AUDIOMANAGER:
      return {
        isOpen: true,
        type: ModalTypes.AudioManager
      };

    case ModalActionTypes.CLOSE_MODAL:
      return initialState;
  }

  return state;
};
