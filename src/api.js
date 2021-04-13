const axios = require("axios");

/**
 * @param host {string}
 * @param createevent {string}
 * @param auth {{ username: string, password: string }}
 *
 * @return {axios.AxiosPromise<void>}
 * */
function updateCameraSettings(host, createevent, auth) {
  return axios.get(`http://${host}/vb.htm`, {
    params: {
      language: "ie",
      createevent,
    },
    auth,
  });
}

const haApi = axios.create({
  baseURL: `http://${process.env.HA_DOMAIN}/services`,
  headers: {
    Authorization: `Bearer ${process.env.SUPERVISOR_TOKEN}`,
    "Content-Type": "application/json",
  },
});

/**
 * @param entityId {string}
 * @param value {'on' | 'off'}
 *
 * @return {axios.AxiosPromise<void>}
 * */
function changeHaSensorValue(entityId, value) {
  return haApi.post(`/input_boolean/turn_${value}`, {
    entity_id: entityId,
  });
}

module.exports = {
  updateCameraSettings,
  changeHaSensorValue,
};
