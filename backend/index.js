const express = require("express");

require("dotenv").config();
require("./database/database.js").connect();

const app = express();
const router = require("./routes/index");
const bodyParser = require("body-parser");

const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

// The application recieves the requests on the port 3000
app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
