const config = require("/data/options.json");

function getSensorIdFromPath(path) {
  const res = path.split("/");

  return res[res.length - 2].replace("/", "");
}

function log(message) {
  if (config.debug) {
    console.log(message);
  }
}

module.exports = {
  getSensorIdFromPath,
  log,
};
