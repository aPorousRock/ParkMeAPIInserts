const MongoClient = require('mongodb').MongoClient;
const conf = require('config');

var AlertsMongoConnector = function(dbname) {
  this.mongo_url = "mongodb://" + conf.MONGO_USERNAME + ":" + conf.MONGO_PASSWORD + "@" + conf.MONGO_HOST + ":" + conf.MONGO_PORT + "/" + dbname + "?authSource=admin";
}

AlertsMongoConnector.prototype.getReducedAlertsByDateAndType = function(date, job_type, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){
      // console.log("Database connection error");
      callback({"message":err}, null);
    }
    else {
      db.collection('reduced_alerts').find({"date": date, "job_type": job_type}, {"_id": 0}).toArray(function(err, docs) {
        if(err){
          db.close();
          callback({"message": err}, null);
        }
          db.close();
          callback(null, docs);
      });
    }

  });
};

module.exports = AlertsMongoConnector;
