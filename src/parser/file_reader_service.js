const fs = require("fs");
const sensorsService = require("./sensors_service");
const utils = require("./utils");
const config = require("/data/options.json");

module.exports = function readFile(path, sensorId) {
  utils.log("trigger " + sensorId + " event");

  switch (sensorId) {
    case config.sensors.motion:
      sensorsService.motionDetect(sensorId);
      break;
    case config.sensors.sound:
      sensorsService.soundDetect(sensorId);
      break;
    default:
      console.log("Неизвестное id сенсора. sensorId: " + sensorId);
  }

  fs.unlink(path, function (err) {
    if (err) {
      console.log("\nНе удалось удалить файл " + path);
      console.log(err);
    }
  });
};
