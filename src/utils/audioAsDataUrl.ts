import fs from "fs";
import dataurl from "dataurl";

export const audioAsDataUrl = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(dataurl.convert({ data, mimetype: "audio/mp3" }));
    });
  });
};
