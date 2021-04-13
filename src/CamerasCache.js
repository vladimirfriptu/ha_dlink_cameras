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
   * @param fields {Array<'entityId' | 'host' | 'auth' | 'createevent' | 'isMotionSensorEnabled' | 'isSoundSensorEnabled'>}
   * @return { Partial<CameraModel>[] }
   * */
  getFilteredFields(fields) {
    const res = [];

    this.cameras.forEach((el) => {
      res.push(el.getFilteredFields(fields));
    });

    return res;
  }

  /**
   * @param entityId {string}
   * @param cameraOptions {{
   *  entityId: string,
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
  set(entityId, cameraOptions) {
    if (this.has(entityId)) {
      this.removeById(entityId);
    }

    const camera = new CameraModel(cameraOptions);

    this.cache.set(entityId, camera);
  }

  /**
   * @param entityId {string}
   * @return boolean
   * */
  has(entityId) {
    return this.cache.has(entityId);
  }

  /**
   * @return number
   * */
  get size() {
    return this.cache.size;
  }

  /**
   * @param entityId {string}
   * */
  removeById(entityId) {
    this.cache.delete(entityId);
  }

  /**
   * @param entityId {string}
   * */
  getByEntityIdId(entityId) {
    return this.cache.get(entityId);
  }
};
