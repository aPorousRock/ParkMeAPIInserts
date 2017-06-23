const express = require('express');
const router = express.Router();
const executeImpalaQuery = require('../impala/query-processor');
const executeSolrQuery = require('../solr/query-processor');
const MongoConnector = require('../mongodb/mongo-connector');
const kafkaConsumer = require('../kafka/kafka-consumer');

router.get('/', function(req, res){
  res.status(200).json({"status": "Running", "Server": "API Fabric"});
});

router.get('/impala/executeQuery', function(req, res) {
  if (req.query.query == "" || req.query.query == undefined){
    return res.status(400).json({"Error": "No query field specified"});
  }

  executeImpalaQuery(req.query.query, function (err, results) {
    if(err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(results);
    }
  });

});

router.get('/solr/executeQuery', function(req, res) {
  if (req.query.query == "" || req.query.query == undefined
    || req.query.collection == "" || req.query.collection == undefined
    || req.query.aggregationMode == "" || req.query.aggregationMode == undefined){
    return res.status(400).json({"Error": "Query fields requred - query,collection,aggregationMode"});
  }

  executeSolrQuery(req.query.query, req.query.collection, req.query.aggregationMode, function (err, results) {
    if(err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(results);
    }
  });

});

router.get('/getAccountsAndServicesByPersona', function(req, res) {
  if(req.query.persona == "" || req.query.persona == undefined) {
    return res.status(400).json({"Incomplete Request": "Please specify `persona` as query"});
  }

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.getAccountsAndServicesByPersona(req.query.persona, function(err, doc) {
    if(err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});

router.get('/getDashboardsByService', function(req, res) {
  if(req.query.service == "" || req.query.service == undefined) {
    return res.status(400).json({"Incomplete Request": "Please specify `service` as query"});
  }

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.getDashboardsByService(req.query.service, function(err, docs) {
    if(err) {
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
  // Setup the IO Client
  var io = req.io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
  });

  // Call kafkaConsumer
  kafkaConsumer(req.query.topic, io);

  res.status(200).json({"response": "no data"});
});

module.exports = router;
