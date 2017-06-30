var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db,callback) {

  app.get('/getAlertsQuickSummaryData', (req, res) => {
    db.collection('mockdata').find({}).toArray(function(err, docs) {
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

  app.get('/getAlertsQuickSummaryDataByDate', (req, res) => {
    const date= req.query.date;
  //  const completed_at=req.query.completed_at;
  // console.log(account_name);
  // const details = {'adopter_name':adopter_name};
    db.collection('mockdata').find({'date':date}).toArray(function (err, items){
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

  app.post('/postAlertsQuickSummaryData', (req, res) => {
      const note = req.body;
      db.collection('mockdata').insert(note, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result.ops[0]);
        }
        console.log("Following record inserted");
      });
    });



};
