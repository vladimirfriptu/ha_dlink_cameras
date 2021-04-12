const path = require("path");

require("dotenv").config({
  path: process.env.ENV_PATH || path.resolve(__dirname, ".env"),
});

require("./src/index");
