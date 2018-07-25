import { ISystemAudioFile } from "../models";
import audio from "../utils/audio";
import uniqid from "uniqid";

const initialState: ISystemAudioFile[] = audio.map((item, index) => {
  return {
    id: `SysAudio${index}`,
    fileName: item.fileName,
    data: require(`../assets/sfx/${item.fileName}`)
  };
});

export const SystemAudioReducer = (
  state: ISystemAudioFile[] = initialState
): ISystemAudioFile[] => {
  return state;
};
