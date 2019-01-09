/* Libs */
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const morgan = require("morgan");
const config = require("config");

/* Routes */
var HomeRoutes = require("./Routes/HomeRoutes");
var ProductRoutes = require("./Routes/ProductRoutes");
var StudentRoutes = require("./Routes/StudentRoutes");

var app = express();

app.use(morgan("dev")); //:method :url :status :response-time ms - :res[content-length]

app.use(express.static(path.join(__dirname, "/libs")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:4200",
  allowedHeaders: "Content-Type, Accept, Authorization"
};
app.options("*", cors());

///* Verify Later */
//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header(
//    "Access-Control-Allow-Headers",
//    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//  );
//	/*
//  if(!req.headers.authorization)
//  {
//	  res.status(401);
//	  res.send(null);
//	return false;
//  }*/
//  next();
//});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something went wrong");
});

app.use("/", HomeRoutes);
app.use("/Products", ProductRoutes);
app.use("/Students", StudentRoutes);
/* 
set NODE_ENV=development
set NODE_PORT=6800

console.log(" ENV " + process.env.NODE_ENV);
console.log(" ENV > " + app.get("env"));
 */
const port = config.get("appPort") || process.env.NODE_PORT || 6800;
app.listen(port, function() {
  console.log(
    `Running -> ${config.get("AppName")} - ${config.get(
      "Mode"
    )} Mode on port ${port}`
  );
});

console.log("HOSTNAME: " + config.util.getEnv("HOSTNAME"));
console.log("NODE_CONFIG: " + config.util.getEnv("NODE_CONFIG"));
console.log("NODE_CONFIG_DIR: " + config.util.getEnv("NODE_CONFIG_DIR"));
