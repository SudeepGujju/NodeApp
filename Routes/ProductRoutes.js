var express = require("express");
var request = require("request");

var router = express.Router();

router.get("/",function(req, res){
    res.send(fnGet());
});

function fnGet(){var request = require("request");
    const URL = "https://api.mlab.com/api/1";
    var DBName = "sudeepdb";
    var CollectionName = "/PersonList";
    var APIKey = "47a_r0w3VQ597IFldGZ_9mMXN1c2jUos";

    request.get(`${URL}/databases/${DBName}/collections/${CollectionName}?apiKey=${APIKey}`,
        function(err, response, body){
            //console.log(err);
            console.log(response);
            //console.log(body);
            return body;
        }
    );
}
module.exports = router;