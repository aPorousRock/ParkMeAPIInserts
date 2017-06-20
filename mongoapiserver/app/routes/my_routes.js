var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db,callback) {

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
    //  callback(items);
      console.dir(items);
      return res.send(items);
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

  // app.get('/logsByNameUpdatedandDate', (req, res) => {
  //   const adopter_name= req.query.adopter_name;
  //   const completed_at=req.query.completed_at;
  // // console.log(account_name);
  // //  const details = {};
  //   db.collection('JobOutput').findOne( {
  //       $and : [
  //           { $or : [ { 'adopter_name':'adopter112' } ] },
  //           { $or : [ { 'completed_at':'2017-03-20T15:47:21+00:00'} ] }
  //       ]
  //   }  , (err, items) => {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       res.send(items);
  //     }
  //     console.log("Found the following record");
  //     console.dir(items);
  //     res.send(items);
  //   });
  // });
  app.get('/logsByjobIDandDate', (req, res) => {
    const jobID= req.query.jobID;
    const completed_at=req.query.completed_at;
  // console.log(account_name);
  //  const details = {};
    db.collection('JobOutput').findOne( {
        $and : [
            { $or : [ { 'jobID':jobID } ] },
            { $or : [ { 'completed_at':completed_at} ] }
        ]
    },(err, items)=>{
      if (err) {
        return res.send({'error':'An error has occurred'});
      } else {
        return res.send(items);
      }
      console.log("Found the following record");
    callback(items);
     console.dir(items);
    return res.send(items);
    });
  });
  app.get('/logsByjobIDUpdatedandDate', (req, res) => {
    const jobID= req.query.jobID;
    const completed_at=req.query.completed_at;
  // console.log(account_name);
  //  const details = {};
    db.collection('JobOutput').findOne( {$and :[{ $or : [ { "jobID":"IBM12345678_summary_msgtype_2017-2-9_2017-2-9_1490119283518" } ] },{ $or : [ { "completed_at":"2017-03-20T15:47:21+00:00"} ] }]}  , (err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
      console.log("Found the following record");
      callback(items);
      console.dir(items);
      res.send(items);
    });
  });

  app.put('/updateLogsByNameandDate', (req, res) => {
    const adopter_name= req.query.adopter_name;
    const completed_at=req.query.completed_at;
      const jobID= req.query.jobID;
  // console.log(account_name);
  //  const details = {};
    db.collection('JobOutput').updateOne({"adopter_name":"adopter112","completed_at":"2017-03-20T15:47:21+00:00"},{$set:{"jobID":"IBM11223124_summary_msgtype_2017-2-9_2017-2-9_1490119283518"}},(err,items)=> {
      if (err) {
        return res.send({'error':'An error has occurred'});
      } else {
        return res.send(items);
      }
      console.log("Found the following record");
     //callback(items);
   console.dir(items);
  // return res.write();
//res.writeContinue();
//return res.send(items);
   res.send(items);
    });
  });

  app.put('/updateLogsByjobIDandDate', (req, res) => {
    const jobID= req.query.jobID;
    const completed_at=req.query.completed_at;
    const account_id=req.query.account_id;
  // console.log(account_name);
  //  const details = {};
    db.collection('JobOutput').updateOne({"jobID":"IBM12345678_summary_msgtype_2017-2-9_2017-2-9_1490119283518","completed_at":"2017-03-20T15:47:21+00:00"},{$set:{"account_id":"ABC7744333"}}
,(err,items)=> {
      if (err) {
        return res.send({'error':'An error has occurred'});
      } else {
        return res.send(items);
      }
      console.log("Found the following record");
     callback(items);
   console.dir(items);
  // return res.write();
  //res.writeContinue();
  //return res.send(items);
  //    res.send(items);
    });
  });

  app.post('/allLogs', (req, res) => {
      const note = req.body;
      db.collection('JobOutput').insert(note, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result.ops[0]);
        }
      });
    });


};
