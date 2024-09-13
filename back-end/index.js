const express = require("express");
const cors = require("cors");
const app = express();

const { sequelize } = require("./src/config/sequelize");
const router = require("./src/routes");
const corsOptions = require("./src/config/WebConfig");

const Port = 8000;

app.use(cors(corsOptions));

sequelize.sync();

app.use(router);

app.listen(Port, () => {
  console.log("servidor rodando na porta, " + Port);
});
