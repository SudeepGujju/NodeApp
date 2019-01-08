const express = require("express");
//var bodyparser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const router = express.Router();

const url = "mongodb://localhost:27017";
const database = "studentDB";
/*
MongoClient.connect(url, function(err, client){
    if(err){
        
        //throw err;
        res.send(err);
    }else{

        const collectionName = "studentcollections";

        let collection = client.db(database).collection(collectionName);

        collection.insertOne(req.body, function(err, data){
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        });
        client.close();
    }
});*/

router.get("/", function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) {
        //throw err;
        res.send(err);
      } else {
        const collectionName = "studentcollections";

        let collection = client.db(database).collection(collectionName);

        collection.find(
          {},
          //{ projection: { ID: 1, Name: 1, createdAt: 1, updatedAt: 1 } },
          function(err, data) {
            // console.log(err, data.toArray());
            if (err) {
              res.send(err);
            } else {
              data
                .toArray()
                .then(function(result) {
                  //res.setHeader("Content-Type", "application/json");
                  //console.log(result);
                  setTimeout(() => {
                    res.send(result).status(200);
                  }, 2000);
                })
                .catch(function(err) {
                  res.send(err);
                });
            }
            client.close();
          }
        ); //
      }
    }
  );
});

router.get("/:id", function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) {
        //throw err;
        res.send(err);
      } else {
        const collectionName = "studentcollections";

        let collection = client.db(database).collection(collectionName);

        collection.find({ ID: req.params.id }, function(err, data) {
          //console.log(err, data.toArray());
          if (err) {
            res.send(err);
          } else {
            data
              .toArray()
              .then(function(result) {
                //console.log(result);
                res.status(200).send(result);
              })
              .catch(function(err) {
                res.send(err);
              });
          }
          client.close();
        });
      }
    }
  );
});

router.post("/", function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) {
        //throw err;
        res.send(err);
      } else {
        const collectionName = "studentcollections";

        let collection = client.db(database).collection(collectionName);

        collection.insertOne(req.body, function(err, data) {
          if (err) {
            res.send(err);
          } else {
            //console.log(data);
            res.send(data);
          }
          client.close();
        });
      }
    }
  );
});

router.delete("/:id", function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) {
        //throw err;
        res.send(err);
      } else {
        const collectionName = "studentcollections";

        let collection = client.db(database).collection(collectionName);

        collection.deleteOne({ id: req.param }, function(err, data) {
          if (err) {
            res.send(err);
          } else {
            //console.log(data);
            res.send(data);
          }
          client.close();
        });
      }
    }
  );
});

router.put("/:id", function(req, res) {
  MongoClient.connect(
    url,
    function(err, client) {
      if (err) {
        //throw err;
        res.send(err);
      } else {
        const collectionName = "studentcollections";

        let collection = client.db(database).collection(collectionName);
        //console.log(req.body);
        collection.updateOne(
          { _id: req.param.id },
          { $set: req.body },
          function(err, data) {
            if (err) {
              res.send(err);
            } else {
              //console.log(data);
              res.send(data);
            }
            client.close();
          }
        );
      }
    }
  );
});

router.all(function(req, res) {
  console.log(" > " + req.body);
});

module.exports = router;
