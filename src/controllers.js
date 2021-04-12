const { Express } = require("express");
const CameraModel = require("./models/CameraModel");

/**
 * @param app {Express}
 * @param camerasOptions {{
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
 * }[]}
 * */
module.exports = function (app, camerasOptions) {
  const cameras = camerasOptions.map(
    (el) =>
      new CameraModel({
        createevent: el.createevent,
        password: el.password,
        host: el.host,
        id: el.id,
        username: el.username,
      })
  );

  app.get("/api/v1/status", function (req, res) {
    res.status(200).json({ status: "active" });
  });

  app.get("/api/v1/cameras", function (req, res) {
    if (cameras.length) {
      res.status(200).json({
        data: cameras.map(
          ({ id, isSoundSensorEnabled, isMotionSensorEnabled }) => ({
            id,
            isSoundSensorEnabled,
            isMotionSensorEnabled,
          })
        ),
      });
    } else {
      res.status(404).json({ error: "Не настроены камеры" });
    }
  });

  app.patch("/api/v1/cameras/:cameraId", async function (req, res) {
    const cameraId = req.params.cameraId;
    const { event } = req.body;

    if (!event) {
      res.status(400).json({ error: `{event} is required param` });
      return;
    }

    const camera = cameras.find((el) => el.id === cameraId);

    if (!camera) {
      res.status(404).json({ error: `camera ${cameraId} not found` });
      return;
    }

    if (!typeof camera[event] === "function") {
      res
        .status(404)
        .json({ error: `camera ${cameraId} hasn\'t ${event} event` });
      return;
    }

    await camera[event]();

    res.status(200).send();
  });
};
