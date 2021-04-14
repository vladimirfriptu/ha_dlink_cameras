import { changeHaSensorValue } from "./api";
import options from "./options";

function createCacheValue(obj: Record<string, any>, id: string, delay: number) {
  return setTimeout(() => {
    delete obj[id];
  }, delay);
}

function createSensorsCache(
  onChangeState: (state: "on" | "off", prop: string) => void
) {
  return new Proxy<Record<string, any>>(
    {},
    {
      set: function (target, prop: string, value): boolean {
        if (target[prop]) {
          clearTimeout(target[prop]);

          target[prop] = value;
        } else {
          onChangeState("on", prop);
          target[prop] = value;
        }

        return true;
      },
      deleteProperty(target, prop: string): boolean {
        onChangeState("off", prop);
        delete target[prop];

        return true;
      },
    }
  );
}

const motionCache = createSensorsCache((state, sensorId) => {
  changeHaSensorValue(`turn_${state}` as any, sensorId);
});

const soundCache = createSensorsCache((state, sensorId) => {
  changeHaSensorValue(`turn_${state}` as any, sensorId);
});

export function motionDetect(deviceId: string) {
  motionCache[deviceId] = createCacheValue(
    motionCache,
    deviceId,
    options.sensor_live_delay.motion
  );
}
export function soundDetect(deviceId: string) {
  soundCache[deviceId] = createCacheValue(
    soundCache,
    deviceId,
    options.sensor_live_delay.sound
  );
}
