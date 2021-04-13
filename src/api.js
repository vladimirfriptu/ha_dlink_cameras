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

function changeHaSensorValue(service, entityId) {
  return haApi.post(`/input_boolean/${service}`, {
    entity_id: `input_boolean.${entityId}`,
  });
}

module.exports = {
  updateCameraSettings,
  changeHaSensorValue,
};
