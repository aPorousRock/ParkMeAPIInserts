const express = require('express');
const router = express.Router();
const executeImpalaQuery = require('../impala/query-processor');
const executeSolrQuery = require('../solr/query-processor');
const MongoConnector = require('../mongodb/mongo-connector');

router.get('/', function(req, res){
  res.status(200).json({"status": "Running", "Server": "Impala"});
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

// router.get('/getAccountsByPersona', function(req, res) {
//   if(req.query.persona == "" || req.query.persona == undefined) {
//     return res.status(400).json({"Error": "Please specify `persona` as query"});
//   }
//
//   var mongoConnector = new MongoConnector('bfmongodb');
//   mongoConnector.getAccountsByPersona(req.query.persona, function(err, accounts) {
//     if(err) {
//       return res.status(500).json(err.message);
//     }
//     else {
//       console.log(accounts);
//       return res.status(200).json(accounts);
//     }
//   });
// });
//
// router.get('/getServicesByPersona', function(req, res) {
//   if(req.query.persona == "" || req.query.persona == undefined) {
//     return res.status(400).json({"Error": "Please specify `persona` as query"});
//   }
//
//   var mongoConnector = new MongoConnector('bfmongodb');
//   mongoConnector.getServicesByPersona(req.query.persona, function(err, services) {
//     if(err) {
//       return res.status(500).json(err.message);
//     }
//     else {
//       console.log(services);
//       return res.status(200).json(services);
//     }
//   });
// });

router.get('/getAccountsAndServicesByPersona', function(req, res) {
  if(req.query.persona == "" || req.query.persona == undefined) {
    return res.status(400).json({"Error": "Please specify `persona` as query"});
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

module.exports = router;
