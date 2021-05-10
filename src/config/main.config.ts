import cors = require("cors");
import express = require("express");
import helmet = require("helmet");

export default {
    init(app: express.Application) {
        app.use(cors());
        app.use(helmet());
        app.use(express.json());
    }
};
