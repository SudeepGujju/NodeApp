/* Libs */
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

/* Routes */
var HomeRoutes = require("./Routes/HomeRoutes");
var ProductRoutes = require("./Routes/ProductRoutes");
var StudentRoutes = require("./Routes/StudentRoutes");

var app = express();

app.use(express.static(path.join(__dirname,"/libs")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

/* This is will be executed for Every Request */
app.use(function(req, res, next){
    //console.log(req.cookies);
    console.log("Request -> "+ req.originalUrl +" Received on -> "+new Date());
    next();
});

app.use(function(err, req, res, next){

    console.log(err.stack);
    res.status(500).send("Something went wrong");
});

app.use('/',HomeRoutes);
app.use('/Products',ProductRoutes);
app.use('/Students',StudentRoutes);

const port = 6800;
app.listen(port,function(){

    console.log("Server has been initialized on port -> "+port);
});

