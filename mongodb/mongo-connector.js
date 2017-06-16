const MongoClient = require('mongodb').MongoClient;
const conf = require('config');

var MongoConnector = function(dbname) {
  this.mongo_url = "mongodb://" + conf.MONGO_USERNAME + ":" + conf.MONGO_PASSWORD + "@" + conf.MONGO_HOST + ":" + conf.MONGO_PORT + "/" + dbname + "?authSource=admin";
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


module.exports = MongoConnector;
