const axios = require("axios");

/**
 * @param host {string}
 * @param createevent {string}
 * @param auth {{ username: string, password: string }}
 *
 * @return {axios.AxiosPromise<void>}
 * */
module.exports = function updateCameraSettings(host, createevent, auth) {
  return axios.get(`http://${host}/vb.htm`, {
    params: {
      language: "ie",
      createevent,
    },
    auth,
  });
};
