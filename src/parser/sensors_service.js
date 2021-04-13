const { changeHaSensorValue } = require("../api");
const config = require("/data/options.json");

function createCacheValue(obj, id, delay) {
  return setTimeout(() => {
    delete obj[id];
  }, delay);
}

function createSensorsCache(onChangeState) {
  return new Proxy(
    {},
    {
      set: function (target, prop, value) {
        if (target[prop]) {
          clearTimeout(target[prop]);

          target[prop] = value;
        } else {
          onChangeState("on", prop);
          target[prop] = value;
        }
      },
      deleteProperty(target, prop) {
        onChangeState("off", prop);
        delete target[prop];
      },
    }
  );
}

const motionCache = createSensorsCache((state, sensorId) => {
  changeHaSensorValue(`turn_${state}`, sensorId);
});

const soundCache = createSensorsCache((state, sensorId) => {
  changeHaSensorValue(`turn_${state}`, sensorId);
});

module.exports = {
  motionDetect: function (deviceId) {
    motionCache[deviceId] = createCacheValue(
      motionCache,
      deviceId,
      config.sensor_live_delay.motion
    );
  },
  soundDetect: function (deviceId) {
    soundCache[deviceId] = createCacheValue(
      soundCache,
      deviceId,
      config.sensor_live_delay.sound
    );
  },
};
