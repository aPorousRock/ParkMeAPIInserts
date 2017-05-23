const express = require('express');
const router = express.Router();
const executeQuery = require('../impala/query-processor');

router.get('/', function(req, res){
  res.status(200).json({"status": "Running", "Server": "Impala"});
});

router.get('/impala/executeQuery', function(req, res) {
  if (req.query.query == "" || req.query.query == undefined){
    return res.status(400).json({"Error": "No query field specified"});
  }

  executeQuery(req.query.query, function (err, results) {
    if(err) {
      return res.status(500).json(err.message);
    }
    else {
      return res.status(200).json(results);
    }
  });

  // var response = executeQuery(req.query.query);
  // console.log(response);
  //
  // res.json({"Success": true});

});

module.exports = router;
