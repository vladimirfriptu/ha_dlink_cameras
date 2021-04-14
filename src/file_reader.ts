import * as fs from "fs";
import { motionDetect, soundDetect } from "./sensors";
import * as utils from "./utils";

import options from "./options";

export function readFile(path: string, sensorId: string): void {
  utils.log("trigger " + sensorId + " event");

  switch (sensorId) {
    case options.sensors.motion:
      motionDetect(sensorId);
      break;
    case options.sensors.sound:
      soundDetect(sensorId);
      break;
    default:
      console.log("Неизвестное id сенсора. sensorId: " + sensorId);
  }

  fs.unlink(path, function (err) {
    if (err) {
      console.log("Не удалось удалить файл " + path);
      console.log(err);
    }
  });
}
