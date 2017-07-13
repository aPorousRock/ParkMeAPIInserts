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

router.get('/getDashboardsByService', function(req, res) {
  if(req.query.service == "" || req.query.service == undefined) {
    return res.status(400).json({"Error": "Please specify `service` as query"});
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

router.get('/getAlertSettingsByPersona', function (req, res) {
  if (req.query.persona == "" || req.query.persona == undefined) {
    return res.status(400).json({ "Error": "Please specify `persona` as query" });
  }

  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.getAlertSettingsByPersona(req.query.persona, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.get('/getAlertsQuickSummaryDataByDate', function (req, res) {
  if (req.query.date == "" || req.query.date == undefined) {
    return res.status(400).json({ "Error": "Please specify `persona` as query" });
  }

  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.getAlertsQuickSummaryDataByDate(req.query.date, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.get('/getAlertsQuickSummaryData', function (req, res) {
  if (req.query == "" || req.query == undefined) {
    return res.status(400).json({ "Error": "Please specify `persona` as query" });
  }

  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.getAlertsQuickSummaryData(req.query, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.get('/getAlertSettingsByPersonaAndDashboard', function (req, res) {
  if (req.query.persona == "" || req.query.persona == undefined||req.query.dashboard == "" || req.query.dashboard == undefined
) {
    return res.status(400).json({ "Error": "Please specify `persona` as query" });
  }

  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.getAlertSettingsByPersonaAndDashboard(req.query.persona,req.query.dashboard, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.post('/addAlertSettings', function (req, res) {
// const note=req.body;
// console.log(note);
// if (req.body == "" || req.body == undefined) {
//  return res.status(400).json({ "Error": "" });
//
  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.addAlertSettings(req.body, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);

      //  res.send(result.ops[0]);


    }
  });
});
router.post('/addAlertQuickSummaryData', function (req, res) {
// const note=req.body;
// console.log(note);
// if (req.body == "" || req.body == undefined) {
//  return res.status(400).json({ "Error": "" });
//
  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.addAlertQuickSummaryData(req.body, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);

      //  res.send(result.ops[0]);


    }
  });
});

module.exports = router;
