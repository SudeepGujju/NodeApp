/* Libs */
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");

/* Routes */
var HomeRoutes = require("./Routes/HomeRoutes");
var ProductRoutes = require("./Routes/ProductRoutes");
var StudentRoutes = require("./Routes/StudentRoutes");

var app = express();

app.use(express.static(path.join(__dirname, "/libs")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

/* This is will be executed for Every Request */
app.use(function(req, res, next) {
  //console.log(req.cookies);
  console.log(
    "Request -> " + req.originalUrl + " Received on -> " + new Date()
  );
  //console.log(req.headers);
  next();
});

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

const port = 6800;
app.listen(port, function() {
  console.log("Server has been initialized on port -> " + port);
});
