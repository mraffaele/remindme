import { IUserAudioFile } from "../models";
import { UserAudioActionTypes, UserAudioAction } from "../actions/UserAudioActions";

export const UserAudioReducer = (
  state: IUserAudioFile[] = [],
  action: UserAudioAction
): IUserAudioFile[] => {
  switch (action.type) {
    case UserAudioActionTypes.SAVE_AUDIO:
      let updated = state.slice(0);
      updated.push(action.payload);
      return updated;

    case UserAudioActionTypes.DELETE_AUDIO:
      return state.filter(item => item.id !== action.payload.id);
  }

  return state;
};
