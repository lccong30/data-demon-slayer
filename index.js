const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const initRoutes = require("./routes");
require("dotenv").config();
const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(json({ limit: "50mb" }));

initRoutes(app);

// app.get("/", (req, res) => {
//   res.status(200).json("Hello guys");
// });

app.listen(port, () => {
  console.log("Server is running!");
});
