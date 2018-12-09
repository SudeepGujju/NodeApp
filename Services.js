var request = require("request");

const URL = "https://api.mlab.com/api/1";
var DBName = "sudeepdb";
var CollectionName = "ProductList";
var APIKey = "47a_r0w3VQ597IFldGZ_9mMXN1c2jUos";

request.get(`${URL}/databases/${DBName}/collections/${CollectionName}?apiKey=${APIKey}`,
            function(err, response, body){
                console.log(err);
                console.log(response);
                console.log(body);
            });