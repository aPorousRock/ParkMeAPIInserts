const MongoClient = require('mongodb').MongoClient;
const conf = require('config');

var MongoConnector = function(bfdata) {
  this.mongo_url = "mongodb://" + conf.MONGO_USERNAME + ":" + conf.MONGO_PASSWORD + "@" + conf.MONGO_HOST + ":" + conf.MONGO_PORT + "/" + dbname + "?authSource=admin";
//  this.mongo_url_alerts = "mongodb://bflogadmin:safe4now@bfmongo201.innovate.ibm.com:27017/bfdata";
  //this.mongo_url_alerts = "mongodb://bflogadmin:safe4now@bfmongo201.innovate.ibm.com:27017/bfdata";
}

// MongoConnector.prototype.getAccountsByPersona = function(persona, callback) {
//
//   MongoClient.connect(this.mongo_url, function(err, db) {
//     if(err){
//       // console.log("Database connection error");
//       callback({"message":err}, null);
//     }
//     else {
//       db.collection('access_control').find({"persona": persona}, {"_id": 0}).limit(1).toArray(function(err, docs) {
//         if(err){
//           // console.log(err);
//           db.close();
//           callback({"message": err}, null);
//         }
//
//         if(!docs || docs.length<1){
//           // console.log("No such persona");
//           db.close();
//           callback({"message": "No such persona"}, null);
//         }
//         else {
//           db.close();
//           callback(null, docs[0].accounts);
//         }
//       });
//     }
//
//     db.close();
//   });
// };
//
// MongoConnector.prototype.getServicesByPersona = function(persona, callback) {
//
//   MongoClient.connect(this.mongo_url, function(err, db) {
//     if(err){
//       // console.log("Database connection error");
//       callback({"message":err}, null);
//     }
//     else {
//       db.collection('access_control').find({"persona": persona}, {"_id": 0}).limit(1).toArray(function(err, docs) {
//         if(err){
//           // console.log(err);
//           db.close();
//           callback({"message": err}, null);
//         }
//
//         if(!docs || docs.length<1){
//           // console.log("No such persona");
//           db.close();
//           callback({"message": "No such persona"}, null);
//         }
//         else {
//           db.close();
//           callback(null, docs[0].services);
//         }
//       });
//     }
//   });
// };

MongoConnector.prototype.getAccountsAndServicesByPersona = function(persona, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
      db.collection('access_control').find({"persona": persona}, {"_id": 0, "username": 0, "password":0}).limit(1).toArray(function(err, docs) {
        if(err){
          // console.log(err);
          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){
          // console.log("No such persona");
          db.close();
          callback({"message": "No such persona"}, null);
        }
        else {
          db.close();
          callback(null, docs[0]);
        }
      });
    }

    db.close();
  });
};

MongoConnector.prototype.getDashboardsByService = function(service, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
      db.collection('dashboards').find({"service": service}, {"_id": 0}).toArray(function(err, docs) {
        if(err){
          // console.log(err);
          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){
          // console.log("No such persona");
          db.close();
          callback({"message": "No such service"}, null);
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
MongoConnector.prototype.getAlertSettingsByPersona = function(persona, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
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
MongoConnector.prototype.getAlertsQuickSummaryData = function(query,callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
      //const persona = req.query.persona;
      db.collection('mockdata').find({},{"_id": 0}).toArray(function (err, docs){
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
MongoConnector.prototype.getAlertsQuickSummaryDataByDate = function(date,callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
      //const persona = req.query.persona;
      db.collection('mockdata').find({'date':date},{"_id": 0}).toArray(function (err, docs){
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
MongoConnector.prototype.getAlertSettingsByPersonaAndDashboard = function(persona,dashboard, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
      //const persona = req.query.persona;
      db.collection('webapp_settings').find({'persona':persona,'dashboard':dashboard},{"_id": 0}).toArray(function (err, docs){
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
MongoConnector.prototype.addAlertSettings = function(body, callback) {
//console.log(note);
  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
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
MongoConnector.prototype.addAlertQuickSummaryData = function(body, callback) {
//console.log(note);
  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
  //  const note=req.body;
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
    // const note = req.body;
      db.collection('mockdata').insert(body, (err, docs) => {
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
