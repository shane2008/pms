const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let port = 8081;

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "PMS backend." });
});

require("./app/routes/routes.js")(app);


if (process.env.NODE_ENV == 'test') {
  port = 8082;
}

// set port, listen for requests
const server = app.listen(port, () => {
  console.log(`PMS backend is ready on port ${port}.`);
});

module.exports = server; 
