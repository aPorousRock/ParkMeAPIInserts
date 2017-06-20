var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/getAllLogs', (req, res) => {
    db.collection('JobOutput').find({}).toArray(function(err, docs) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(docs);
      }
        //  assert.equal(err,null);
    //  assert.equal(10,docs.length);
          console.log("Found the following records");
          console.dir(docs);
          res.send(docs);
    });
  });


  app.get('/logsByName', (req, res) => {
    const adopter_name= req.query.adopter_name;
  //  const completed_at=req.query.completed_at;
  // console.log(account_name);
  // const details = {'adopter_name':adopter_name};
    db.collection('JobOutput').find({'adopter_name':adopter_name}).toArray(function (err, items){
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
      console.log("Found the following record");
      console.dir(items);
      res.send(items);
    });
  });

  app.get('/logsByNameandDate', (req, res) => {
    const adopter_name= req.query.adopter_name;
    const completed_at=req.query.completed_at;
  // console.log(account_name);
  //  const details = {};
    db.collection('JobOutput').findOne( {
        $and : [
            { $or : [ { 'adopter_name':adopter_name } ] },
            { $or : [ { 'completed_at':completed_at} ] }
        ]
    }  , (err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
      console.log("Found the following record");
      console.dir(items);
      res.send(items);
    });
  });
  
  app.put('/updateLogsByNameandDate', (req, res) => {
    const adopter_name= req.query.adopter_name;
    const completed_at=req.query.completed_at;
  // console.log(account_name);
  //  const details = {};
    db.collection('JobOutput').updateOne({"adopter_name":"adopter112","completed_at":"2017-03-20T15:47:21+00:00"},{$set:{"jobID":"job22222"}} , (err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
      console.log("Found the following record");
      console.dir(items);
      res.send(items);
    });
  });


};
