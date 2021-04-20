import * as fs from "fs";
import { motionDetect, soundDetect } from "./sensors";
import * as utils from "./utils";

export function readFile(path: string, sensorId: string): void {
  utils.log("trigger " + sensorId + " event");

  if (sensorId.includes("motion")) motionDetect(sensorId);
  else if (sensorId.includes("sound")) soundDetect(sensorId);
  else {
    console.log("Неизвестное id сенсора. sensorId: " + sensorId);
    return;
  }

  fs.unlink(path, function (err) {
    if (err) {
      console.log("Не удалось удалить файл " + path);
      console.log(err);
    }
  });
}
