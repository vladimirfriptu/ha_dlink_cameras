const express = require("express");
const initSwagger = require("./swagger");
const initControllers = require("./controllers");

async function initApp() {
  const app = express();

  await initSwagger(app);
  initControllers(app);

  app.listen(process.env.EXPRESS_PORT);
  console.log(`Сервер запущен на порте: ${process.env.EXPRESS_PORT}`);
}

initApp();
