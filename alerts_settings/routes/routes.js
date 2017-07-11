const express = require('express');
const router = express.Router();
//const executeMongoInsertQuery = require('../mongo/query-processor-insert');

const MongoConnector = require('../mongodb/mongo-connector');


router.get('/getByPersona', function (req, res) {
  if (req.query.persona == "" || req.query.persona == undefined) {
    return res.status(400).json({ "Error": "Please specify `persona` as query" });
  }

  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.getByPersona(req.query.persona, function (err, doc) {
    if (err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(doc);
    }
  });
});
router.post('/addSettings', function (req, res) {
// const note=req.body;
// console.log(note);
// if (req.body == "" || req.body == undefined) {
//  return res.status(400).json({ "Error": "" });
//
  var mongoConnector = new MongoConnector('bfdata');
  mongoConnector.addSettings(req.body, function (err, doc) {
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
