import express = require("express");
import mainConfig from "./config/main.config";
import routesConfig from "./config/routes.config";

const app: express.Application = express();

mainConfig.init(app);
routesConfig.init(app);

export default app;
