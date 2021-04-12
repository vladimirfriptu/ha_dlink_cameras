const CameraModel = require("./models/CameraModel");

module.exports = class CamerasCache {
  constructor(cameras) {
    this.cache = new Map();

    cameras.forEach((el) => {
      this.cache.set(el.id, new CameraModel(el));
    });
  }

  /**
   * @return {CameraModel[]}
   * */
  get cameras() {
    return Array.from(this.cache.values());
  }

  /**
   * @param fields {Array<'id' | 'host' | 'auth' | 'createevent' | 'isMotionSensorEnabled' | 'isSoundSensorEnabled'>}
   * @return { Partial<CameraModel>[] }
   * */
  getFilteredFields(fields) {
    const res = [];

    this.cameras.forEach((el) => {
      const obj = {};

      for (const field of fields) {
        if (el.hasOwnProperty(field)) {
          obj[field] = el[field];
        }
      }

      res.push(obj);
    });

    return res;
  }

  /**
   * @param cameraId {string}
   * @param cameraOptions {{
   *  id: string,
   *  host: string,
   *  username: string,
   *  password: string,
   *  createevent: {
   *   motionOn: string,
   *   motionOff: string,
   *   soundOn: string,
   *   soundOff: string
   *  }
   * }}
   * */
  set(cameraId, cameraOptions) {
    if (this.has(cameraId)) {
      this.removeById(cameraId);
    }

    const camera = new CameraModel(cameraOptions);

    this.cache.set(cameraId, camera);
  }

  /**
   * @param cameraId {string}
   * @return boolean
   * */
  has(cameraId) {
    return this.cache.has(cameraId);
  }

  /**
   * @return number
   * */
  get size() {
    return this.cache.size;
  }

  /**
   * @param cameraId {string}
   * */
  removeById(cameraId) {
    this.cache.delete(cameraId);
  }

  /**
   * @param cameraId {string}
   * */
  getById(cameraId) {
    return this.cache.get(cameraId);
  }
};
