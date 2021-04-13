const { updateCameraSettings, changeHaSensorValue } = require("../api");

class CameraModel {
  /**
   * @param fields {{
   *  entityId: string,
   *  host: string,
   *  username: string,
   *  password: string,
   *
   * createevent: {
   *  motionOn: string,
   *  motionOff: string,
   *  soundOn: string,
   *  soundOff: string
   * }
   * }}
   * */
  constructor(fields) {
    this.entityId = fields.entityId;
    this.host = fields.host;
    this.auth = {
      username: fields.username,
      password: fields.password,
    };
    this.createevent = fields.createevent;

    this.isMotionSensorEnabled = false;
    this.isSoundSensorEnabled = false;

    this.enableAllSensors();
  }

  get motionEntityId() {
    return `${this.entityId}_motion_detection`;
  }

  get soundEntityId() {
    return `${this.entityId}_sound_detection`;
  }

  /**
   * @param fields {Array<'id' | 'host' | 'auth' | 'createevent' | 'isMotionSensorEnabled' | 'isSoundSensorEnabled'>}
   * @return Partial<CameraModel>
   * */
  getFilteredFields(fields) {
    return fields.reduce(
      (acc, current) =>
        this.hasOwnProperty(current)
          ? {
              ...acc,
              [current]: this[current],
            }
          : acc,
      {}
    );
  }

  async enableMotionSensor() {
    if (this.isMotionSensorEnabled) return;

    try {
      await updateCameraSettings(
        this.host,
        this.createevent.motionOn,
        this.auth
      );

      await changeHaSensorValue("turn_on", this.motionEntityId);

      this.isMotionSensorEnabled = true;

      return {};
    } catch (err) {
      console.log(`${this.entityId} camera > enableMotionSensor error`, err);
      // todo обработка ошибок
      return {
        error: err,
      };
    }
  }

  async disableMotionSensor() {
    if (!this.isMotionSensorEnabled) return;

    try {
      await updateCameraSettings(
        this.host,
        this.createevent.motionOff,
        this.auth
      );

      await changeHaSensorValue("turn_off", this.motionEntityId);

      this.isMotionSensorEnabled = false;

      return {};
    } catch (err) {
      console.log(`${this.entityId} camera > disableMotionSensor error`, err);
      // todo обработка ошибок
      return {
        error: err,
      };
    }
  }

  async enableSoundSensor() {
    if (this.isSoundSensorEnabled) return;

    try {
      await updateCameraSettings(
        this.host,
        this.createevent.soundOn,
        this.auth
      );

      await changeHaSensorValue("turn_on", this.soundEntityId);

      this.isSoundSensorEnabled = true;

      return {};
    } catch (err) {
      console.log(`${this.entityId} camera > enableSoundSensor error`, err);
      // todo обработка ошибок
      return {
        error: err,
      };
    }
  }

  async disableSoundSensor() {
    if (!this.isSoundSensorEnabled) return;

    try {
      await updateCameraSettings(
        this.host,
        this.createevent.soundOff,
        this.auth
      );

      await changeHaSensorValue("turn_off", this.soundEntityId);

      this.isSoundSensorEnabled = false;

      return {};
    } catch (err) {
      console.log(`${this.entityId} camera > disableSoundSensor error`, err);
      // todo обработка ошибок
      return {
        error: err,
      };
    }
  }

  async disableAllSensors() {
    const res = await Promise.all([
      this.disableMotionSensor(),
      this.disableSoundSensor(),
    ]);

    for (const key in res) {
      if (res[key].error) {
        return res[key].error;
      }
    }

    return {};
  }

  async enableAllSensors() {
    const res = await Promise.all([
      this.enableMotionSensor(),
      this.enableSoundSensor(),
    ]);

    for (const key in res) {
      if (res[key].error) {
        return res[key].error;
      }
    }

    return {};
  }

  update;
}

module.exports = CameraModel;
