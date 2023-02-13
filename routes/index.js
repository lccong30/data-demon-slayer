routerCharacter = require("./character");
const initRoutes = (app) => {
  app.use("/v1", routerCharacter);
};

module.exports = initRoutes;
