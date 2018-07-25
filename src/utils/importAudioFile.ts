const { dialog } = require("electron").remote;
import fs from "fs";
import dataurl from "dataurl";
import uniqid from "uniqid";
import IUserAudioFile from "../models/IUserAudioFile";

const importAudioFile = (callback: Function): void => {
  dialog.showOpenDialog(
    {
      title: "Open File",
      properties: ["openFile"],
      filters: [{ name: "Audio Files", extensions: ["mp3"] }]
    },
    (filePath: string[]) => {
      if (!filePath && !filePath.length) {
        return null;
      }

      fs.readFile(filePath[0], (err, data: Buffer) => {
        if (err) {
          return null;
        }

        const audio: IUserAudioFile = {
          id: uniqid(),
          filePath: filePath[0],
          fileName: filePath[0].split("\\").pop(),
          data: dataurl.convert({ data, mimetype: "audio/mp3" })
        };
        callback(audio);
      });
    }
  );
};

export default importAudioFile;
