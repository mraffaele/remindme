import { IUserAudioFile } from "../models";

export enum UserAudioActionTypes {
  SAVE_AUDIO = "SAVE_AUDIO",
  DELETE_AUDIO = "DELETE_AUDIO"
}

export interface IUserAudioAction {
  type: UserAudioActionTypes;
  payload: IUserAudioFile;
}

export interface IDeleteAudioAction {
  type: UserAudioActionTypes.DELETE_AUDIO;
  payload: IUserAudioFile;
}

export type UserAudioAction = IUserAudioAction;

export function saveAudio(audio: IUserAudioFile): IUserAudioAction {
  return {
    type: UserAudioActionTypes.SAVE_AUDIO,
    payload: audio
  };
}

export function deleteAudio(audio: IUserAudioFile): IUserAudioAction {
  return {
    type: UserAudioActionTypes.DELETE_AUDIO,
    payload: audio
  };
}
