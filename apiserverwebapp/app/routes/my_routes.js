var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db,callback) {

  app.get('/getSettingsData', (req, res) => {
    db.collection('webapp_settings').find({}).toArray(function(err, docs) {
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

  app.get('/getSettingsByPersonaAndDashboard', (req, res) => {
    const persona= req.query.persona;
   const dashboard=req.query.dashboard;
  // console.log(account_name);
  // const details = {'adopter_name':adopter_name};
  db.collection('webapp_settings').findOne( {
      $and : [
          { $or : [ { 'persona':persona } ] },
          { $or : [ { 'dashboard':dashboard} ] }
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

  app.put('/addSettings', (req, res) => {
    const persona= req.query.persona;
    const dashboard=req.query.dashboard;
    db.collection('webapp_settings').updateOne({"persona":"adopter111"},{$set:{"dashboard":"new_alertexplorers"}},{upsert:true},(err,items)=> {
      if (err) {
        return res.send({'error':'An error has occurred'});
      } else {
        return res.send(items);
      }
   console.dir(items);
   res.send(items);
    });
  });

};
