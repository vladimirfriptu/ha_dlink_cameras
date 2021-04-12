const swaggerUi = require("swagger-ui-express");
const { Express } = require("express");
const swaggerDocument = require("./swaggerDocument.json");

/**
 * @param app {Express}
 * */
module.exports = async function (app) {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`swagger доступен по пути /swagger`);
};
