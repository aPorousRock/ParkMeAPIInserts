const MongoClient = require('mongodb').MongoClient;
const conf = require('config');

var MongoConnector = function(bfdata) {
  this.mongo_url = "mongodb://bflogadmin:safe4now@bfmongo201.innovate.ibm.com:27017/bfdata"
}
MongoConnector.prototype.getByPersona = function(persona, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
      //const persona = req.query.persona;
      db.collection('webapp_settings').find({'persona':persona},{"_id": 0}).toArray(function (err, docs){
        if(err){
          // console.log(err);
          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){
          // console.log("No such persona");
          db.close();
          callback({"message": "No such record"}, null);
        }
        else {
          db.close();
          callback(null, docs);
        }
      });
    }

    db.close();
  });
};
MongoConnector.prototype.addSettings = function(body, callback) {
//console.log(note);
  MongoClient.connect(this.mongo_url, function(err, db) {
  //  const note=req.body;
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
    // const note = req.body;
      db.collection('webapp_settings').insert(body, (err, docs) => {
    //     if (err) {
    //       res.send({ 'error': 'An error has occurred' });
    //     } else {
    //       res.send(result.ops[0]);
    //     }
    //     console.log("Following record inserted");
    //   });
    // });

        if(err){
          // console.log(err);
          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){
          // console.log("No such persona");
          db.close();
          callback({"message": "No such record"}, null);
        }
        else {
          db.close();
        //  res.send(docs.ops[0]);
          callback(null, docs);
        }
      });
    }

    db.close();
  });
};



module.exports = MongoConnector;
