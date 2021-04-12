const updateCameraSettings = require("../api");

class CameraModel {
  /**
   * @param fields {{
   *  id: string,
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
    this.id = fields.id;
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

  async enableMotionSensor() {
    if (this.isMotionSensorEnabled) return;

    try {
      await updateCameraSettings(
        this.host,
        this.createevent.motionOn,
        this.auth
      );

      this.isMotionSensorEnabled = true;

      return {};
    } catch (err) {
      console.log(`${this.id} camera > enableMotionSensor error`, err);
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

      this.isMotionSensorEnabled = false;

      return {};
    } catch (err) {
      console.log(`${this.id} camera > disableMotionSensor error`, err);
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

      this.isSoundSensorEnabled = true;

      return {};
    } catch (err) {
      console.log(`${this.id} camera > enableSoundSensor error`, err);
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

      this.isSoundSensorEnabled = false;

      return {};
    } catch (err) {
      console.log(`${this.id} camera > disableSoundSensor error`, err);
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
      if (res[key]?.error) {
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
      if (res[key]?.error) {
        return res[key].error;
      }
    }

    return {};
  }
}

module.exports = CameraModel;
