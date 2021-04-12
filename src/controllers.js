const { Express } = require("express");

/**
 * @param app {Express}
 * */
module.exports = function (app) {
  app.get("/status", function (req, res) {
    res.status(200).json({ status: "active" });
  });
};
