const express = require('express');
const router = express.Router();
const executeImpalaQuery = require('../impala/query-processor');
const executeSolrQuery = require('../solr/query-processor');
const executeSolrUpdateQuery = require('../solr/query-processor-update');
const executeSolrUpdateAddQuery = require('../solr/query-processor-updateAdd');
const executeSolrUpdateIncQuery = require('../solr/query-processor-updateInc');
const MongoConnector = require('../mongodb/mongo-connector');
const AlertsMongoConnector = require('../mongodb/alert-reduce.js');
const kafkaConsumer = require('../kafka/kafka-consumer').kafkaConsumer;
const loginDB = require("../mongodb/login");
const passport = require('passport');

var loginDBobj = new loginDB("bfmongodb");
loginDBobj.login();

router.get('/', function (req, res) {
  return res.status(200).json({ "status": "Running", "Server": "API Fabric" });
});

router.get('/incorrectlogin', function (req, res) {
  res.status(401).json({ "Error": "You have entered an invalid username or password" });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/incorrectlogin' }), function(req, res) {
  // Successful Login
  res.status(200).json({"user": req.user});
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
      return res.status(500).json(err.message)
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
router.get('/getAlertSettings', function (req, res) {
<<<<<<< HEAD
  if (req.query == "" || req.query == undefined)
 {
    return res.status(400).json({ "Error": "Please specify `correct record` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.getAlertSettings(req.query, function (err, docm) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(docm);
    }
  });
});
router.put('/updateAlertSettings', function (req, res) {
  if (req.query.persona == "" || req.query.persona== undefined)

 {
    return res.status(400).json({ "Error": "Please specify `correct record` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.updateAlertSettings(req.persona, function (err, docm) {
=======
  if (req.query == "" || req.query == undefined) {
    return res.status(400).json({ "Error": "Please specify `correct record` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');

  mongoConnector.getAlertSettings(req.query, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
<<<<<<< HEAD
      return res.status(200).json(docm);
=======
      return res.status(200).json(doc);
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    }
  });
});

router.get('/getAlertSettingsByPersona', function (req, res) {
  if (req.query.persona == "" || req.query.persona == undefined) {
    return res.status(400).json({ "Error": "Please specify `persona` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.getAlertSettingsByPersona(req.query.persona, function (err, doc1) {
=======
  mongoConnector.getAlertSettingsByPersona(req.query.persona, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
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
    return res.status(400).json({ "Error": "Please specify `personaanddashboard as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');

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

  var mongoConnector = new MongoConnector('bfmongodb');

  mongoConnector.addAlertSettings(req.body, function (err, doc) {
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
    return res.status(400).json({ "Error": "Please specify `personaanddashboard as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.getAlertSettingsByPersonaAndDashboard(req.query.persona,req.query.dashboard, function (err, doc9) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc9);
    }
  });
});
router.post('/addAlertSettings', function (req, res) {

  var mongoConnector = new MongoConnector('bfmongodb');
  mongoConnector.addAlertSettings(req.body, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);



    }
  });
});
router.get('/getLogsByName', function (req, res) {
  if (req.query.adopter_name == "" || req.query.adopter_name == undefined) {
    return res.status(400).json({ "Error": "Please specify `name ` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.getLogsByName(req.query.adopter_name, function (err, doc2) {
=======
  mongoConnector.getLogsByName(req.query.adopter_name, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.get('/getLogsByNameAndDate', function (req, res) {
  if (req.query.adopter_name == "" || req.query.adopter_name == undefined||req.query.completed_at == "" || req.query.completed_at == undefined
) {
    return res.status(400).json({ "Error": "Please specify `name and date ` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.getLogsByNameAndDate(req.query.adopter_name,req.query.completed_at, function (err, doc3) {
=======
  mongoConnector.getLogsByNameAndDate(req.query.adopter_name,req.query.completed_at, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.put('/updateLogsByNameAndDate', function (req, res) {
  if (req.query.adopter_name == "" || req.query.adopter_name == undefined||req.query.completed_at == "" || req.query.completed_at == undefined
) {
    return res.status(400).json({ "Error": "Please specify `name and date ` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.updateLogsByNameAndDate(req.query.adopter_name,req.query.completed_at, function (err, doc4) {
=======
  mongoConnector.updateLogsByNameAndDate(req.query.adopter_name,req.query.completed_at, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.get('/getLogsByJobIDAndDate', function (req, res) {
  if (req.query.jobID == "" || req.query.jobID == undefined||req.query.completed_at == "" || req.query.completed_at == undefined
) {
    return res.status(400).json({ "Error": "Please specify `jobid and date ` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.getLogsByJobIDAndDate(req.query.jobID,req.query.completed_at, function (err, doc5) {
=======
  mongoConnector.getLogsByJobIDAndDate(req.query.jobID,req.query.completed_at, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
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
    return res.status(400).json({ "Error": "Please specify `date` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.getAlertsQuickSummaryDataByDate(req.query.date, function (err, doc6) {
=======
  mongoConnector.getAlertsQuickSummaryDataByDate(req.query.date, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
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
    return res.status(400).json({ "Error": "Please specify `correct data` as query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.getAlertsQuickSummaryData(req.query, function (err, doc7) {
=======
  mongoConnector.getAlertsQuickSummaryData(req.query, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.get('/getAllLogs', function (req, res) {
  if (req.query == "" || req.query == undefined) {
    return res.status(400).json({ "Error": "Please specify `correct logs` query" });
  }

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.getAllLogs(req.query, function (err, doc8) {
=======
  mongoConnector.getAllLogs(req.query, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
<<<<<<< HEAD
      return res.status(200).json(doc8);
=======
      return res.status(200).json(doc);
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    }
  });
});

router.post('/addAlertQuickSummaryData', function (req, res) {

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.addAlertQuickSummaryData(req.body, function (err, doc10) {
=======
  mongoConnector.addAlertQuickSummaryData(req.body, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);




    }
  });
});
router.post('/addLogs', function (req, res) {

  var mongoConnector = new MongoConnector('bfmongodb');
<<<<<<< HEAD
  mongoConnector.addLogs(req.body, function (err, doc11) {
=======
  mongoConnector.addLogs(req.body, function (err, doc) {
>>>>>>> 956a21a491804109adf50ea85c8d8c92ac4d8cfa
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);



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

router.get('/getReducedAlertsByDate', function(req, res, next) {
  if(req.query.date == "" || req.query.date == undefined) {
    return res.status(400).json({"Incomplete Request": "Please specify `date` as query"});
  }

  var mongoConnector = new AlertsMongoConnector('bfmongodb');
  mongoConnector.getReducedAlertsByDate(req.query.date, function (err, docs) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(docs);
    }
  });
});

module.exports = router;
