var express = require("express");
var path = require("path");
var pug = require("pug");

var router = express.Router();

var Utilities = require("./../Utilities");
//var Services = require("./Services");

/*
router.get("/",function(req, res){

    res.sendFile(path.join(__dirname,"..","Pages","index.html"));
});
*/
router.get("/",function(req, res){

    res.clearCookie("UserName");
    res.clearCookie("Password");
   //res.sendFile(path.join(__dirname,"..","Pages","login.html"));
   res.send(pug.renderFile(path.join(__dirname,"..","Pages","login.pug"),{"Invalid":req.query.Invalid}));
});

/* 
** You can have multiple routes for same path
** But Second route will not be Executed if once First route sends response
** If you want to execute next route use -> next('route');
** next('route') -> This skip the rest of the middleware functions from a router middleware stack
*/
/*
router.post("/login", ValidateUser);

router.get("/login", ValidateUser);
*/

router.all("/login", ValidateUser);

//res.sendFile(path.join(__dirname,"..","Pages","home.html"));

function ValidateUser(req, res){

    if( req.body.UserName && req.body.password ){

        if(fnValidCreateCookie(req, res, req.body)){

            res.sendFile(path.join(__dirname,"..","Pages","home2.html"));

        }else
            res.redirect("/?Invalid=true");

    }
    else if(req.cookies.UserName && req.cookies.Password)
    {
        var vUsrDtls = { "UserName":req.cookies.UserName, "password" : req.cookies.Password};

        if(fnValidCreateCookie(req, res, vUsrDtls)){

            res.sendFile(path.join(__dirname,"..","Pages","home2.html"));

        }else
            res.redirect("/");

    } else {
        res.redirect("/");
    }
}

router.all("/logout", (req, res) => { res.redirect("/"); });

module.exports = router;

router.get("/home2",function(req, res){
    res.sendFile(path.join(__dirname,"..","Pages","home2.html"));
});

function fnValidCreateCookie(req, res, UsrDtls){

    var UserDtls = Utilities.ValidateUser(UsrDtls);
    if(UserDtls){
        res.cookie('UserName', UserDtls.UserName, {maxAge : 999999});
        res.cookie('Password', UserDtls.password, {maxAge : 999999});
        return true; 
    }else{
        return false;
    }

}