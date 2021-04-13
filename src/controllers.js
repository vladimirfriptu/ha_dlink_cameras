const { Express } = require("express");
const CamerasCache = require("./CamerasCache");

/**
 * @param app {Express}
 * @param camerasOptions {{
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
 * }[]}
 * */
module.exports = function (app, camerasOptions) {
  console.log(camerasOptions);
  const camerasCache = new CamerasCache(camerasOptions);

  app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "active" });
  });

  app.get("/api/cameras", function (req, res) {
    if (camerasCache.size) {
      res.status(200).json({
        data: camerasCache.getFilteredFields([
          "entityId",
          "isSoundSensorEnabled",
          "isMotionSensorEnabled",
        ]),
      });
    } else {
      res.status(404).json({ error: "Не настроены камеры" });
    }
  });

  app.patch("/api/cameras/:entityId", async function (req, res) {
    const entityId = req.params.entityId;
    const { event } = req.body;

    if (!event) {
      res.status(400).json({ error: `{event} is required param` });
      return;
    }

    if (!camerasCache.has(entityId)) {
      res.status(404).json({ error: `camera ${entityId} not found` });
      return;
    }

    const camera = camerasCache.getByEntityIdId(entityId);

    if (!typeof camera[event] === "function") {
      res
        .status(404)
        .json({ error: `camera ${entityId} hasn\'t ${event} event` });
      return;
    }

    const { error } = await camera[event]();

    if (error) {
      res.status(403).json({ error });
      return;
    }

    res.status(200).send();
  });
};
