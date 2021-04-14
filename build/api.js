"use strict";
exports.__esModule = true;
exports.changeHaSensorValue = void 0;
var axios_1 = require("axios");
var haApi = axios_1["default"].create({
    baseURL: "http://" + process.env.HA_DOMAIN + "/services",
    headers: {
        Authorization: "Bearer " + process.env.SUPERVISOR_TOKEN,
        "Content-Type": "application/json"
    }
});
function changeHaSensorValue(service, entityId) {
    return haApi.post("/input_boolean/" + service, {
        entity_id: "input_boolean." + entityId
    });
}
exports.changeHaSensorValue = changeHaSensorValue;
