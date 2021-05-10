import express = require("express");
import mainConfig from "./config/main.config";

const app: express.Application = express();

mainConfig.init(app);

export default app;
