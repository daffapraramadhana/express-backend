const express = require("express");
const app = express();
const port = 3003;
const routes = require("./route");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json()); // for application/json
app.use("/process", routes.routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(process.env.NODE_ENV);
});
