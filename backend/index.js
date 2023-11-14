const express = require("express");

require("dotenv").config();
require("./database/database.js").connect();
const cors = require("cors");

const app = express();
const router = require("./routes/index");
const bodyParser = require("body-parser");

const port = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static("./uploads"));

app.use("/api", router);

// The application recieves the requests on the port 3000
app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
