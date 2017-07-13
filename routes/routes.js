const express = require('express');
const router = express.Router();
const executeImpalaQuery = require('../impala/query-processor');
const executeSolrQuery = require('../solr/query-processor');
const executeSolrUpdateQuery = require('../solr/query-processor-update');
const executeSolrUpdateAddQuery = require('../solr/query-processor-updateAdd');
const executeSolrUpdateIncQuery = require('../solr/query-processor-updateInc');
const MongoConnector = require('../mongodb/mongo-connector');
const kafkaConsumer = require('../kafka/kafka-consumer').kafkaConsumer;
const loginDB = require("../mongodb/login");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

var loginDBobj = new loginDB("bfmongodb");
loginDBobj.login();

router.get('/', function (req, res) {
  res.status(200).json({ "status": "Running", "Server": "API Fabric" });
});

router.get('/not', function (req, res) {
  res.status(200).json({ "status": "Running", "Server": "Error" });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/not' }), function(req, res) {
  // if(req.query.username == "" || req.query.username == undefined || req.query.password == "" || req.query.password == undefined){
  //   return res.status(400).json({"Error": "No username or password sent"});
  // }

  res.redirect('/');
});

router.get('/impala/executeQuery', function (req, res) {
  if (req.query.query == "" || req.query.query == undefined) {
    return res.status(400).json({ "Error": "No query field specified" });
  }

  executeImpalaQuery(req.query.query, function (err, results) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(results);
    }
  });

});

router.get('/solr/executeQuery', function (req, res) {
  if (req.query.query == "" || req.query.query == undefined
    || req.query.collection == "" || req.query.collection == undefined
    || req.query.aggregationMode == "" || req.query.aggregationMode == undefined) {
    return res.status(400).json({ "Error": "Query fields required - query,collection,aggregationMode" });
  }

  executeSolrQuery(req.query.query, req.query.collection, req.query.aggregationMode, function (err, results) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(results);
    }
  });

});

router.get('/solr/update', function (req, res) {
  if (req.query.id == "" || req.query.id == undefined ||
    req.query.property == "" || req.query.property == undefined ||
    req.query.propValue == "" || req.query.propValue == undefined
    || req.query.collection == "" || req.query.collection == undefined
  )
    return res.status(400).json({ "Error": "Query fields required - query,collection,aggregationMode" });
  executeSolrUpdateQuery(req.query.id, req.query.property, req.query.propValue, req.query.collection, function (err, results) {

    if (err) {
      return res.status(500).json("Error");
    }
    else {
      return res.status(200).json(results);
    }
  });

});
router.get('/solr/updateAdd', function (req, res) {
  if (req.query.id == "" || req.query.id == undefined ||
    req.query.property == "" || req.query.property == undefined ||
    req.query.propValue == "" || req.query.propValue == undefined
  //  ||  req.query.newpropValue == "" || req.query.newpropValue == undefined
    || req.query.collection == "" || req.query.collection == undefined
  )
    return res.status(400).json({ "Error": "Query fields required - query,collection,aggregationMode" });
  executeSolrUpdateAddQuery(req.query.id, req.query.property, req.query.propValue, req.query.collection, function (err, results) {

    if (err) {
      return res.status(500).json("Error");
    }
    else {
      return res.status(200).json(results);
    }
  });

});

router.get('/solr/updateInc', function (req, res) {
  if (req.query.id == "" || req.query.id == undefined ||
    req.query.property == "" || req.query.property == undefined ||
    req.query.propValue == "" || req.query.propValue == undefined
  //  ||  req.query.newpropValue == "" || req.query.newpropValue == undefined
    || req.query.collection == "" || req.query.collection == undefined
  )
    return res.status(400).json({ "Error": "Query fields required - query,collection,aggregationMode" });
  executeSolrUpdateIncQuery(req.query.id, req.query.property, req.query.propValue, req.query.collection, function (err, results) {

    if (err) {
      return res.status(500).json("Error");
    }
    else {
      return res.status(200).json(results);
    }
  });

});

router.get('/getAccountsAndServicesByPersona', function (req, res) {
  if (req.query.persona == "" || req.query.persona == undefined) {
    return res.status(400).json({ "Error": "Please specify `persona` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.getAccountsAndServicesByPersona(req.query.persona, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});

router.get('/getDashboardsByService', function (req, res) {
  if (req.query.service == "" || req.query.service == undefined) {
    return res.status(400).json({ "Error": "Please specify `service` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.getDashboardsByService(req.query.service, function (err, docs) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(docs);
    }
  });
});

router.get('/getKafkaData', function(req, res, next) {
  if(req.query.topic == "" || req.query.topic == undefined) {
    return res.status(400).json({"Incomplete Request": "Please specify `topic` as query"});
  }

  console.log("Streaming started");

  // Call kafkaConsumer
  kafkaConsumer(req.query.topic, req.io);

  return res.status(200).json({"response": "Streaming started"});
});

module.exports = router;
