const express = require("express");
const initSwagger = require("./swagger");
const initControllers = require("./controllers");
const bodyParser = require("body-parser");
// todo поправить для прода
const options = require("../data/options.json");

async function initApp() {
  const app = express();

  app.use(bodyParser.json());

  await initSwagger(app);
  initControllers(app, options.cameras);

  app.listen(process.env.EXPRESS_PORT);
  console.log(`Сервер запущен на порте: ${process.env.EXPRESS_PORT}`);
}

initApp();
