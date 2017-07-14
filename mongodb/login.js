const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const conf = require('config');
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

var loginDB = function(dbname) {
  this.mongo_url = "mongodb://" + conf.MONGO_USERNAME + ":" + conf.MONGO_PASSWORD + "@" + conf.MONGO_HOST + ":" + conf.MONGO_PORT + "/" + dbname + "?authSource=admin";

};

loginDB.prototype.login = function() {
  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){
      // console.log("Database connection error");
      console.log("Database Error:\n" + err);
      return;
    }
    else {

      passport.use(new Strategy(
        function(username, password, callback) {
          // Write check function
          db.collection("access_control").find({username: username}).limit(1).toArray(function(err, user) {
            if(err) {
              return callback(err);
            }

            if(user.length == 0) {
              return callback(null, false);
            }

            if(user[0].password != password) {
              return callback(null, false);
            }

            //drop the password
            delete user[0].password;

            return callback(null, user[0]);
          });
        }
      ));

      passport.serializeUser(function(user, callback) {
        callback(null, user._id);
      });

      passport.deserializeUser(function(id, callback) {
        var objectId = new ObjectID(id);
        db.collection("access_control").find({_id: objectId}).limit(1).toArray(function(err, user) {
          if(err) {
            return callback(err);
          }

          callback(null, user[0]);
        });
      });
    }

      // passport.use(new Strategy(
      //   function(username, password, callback) {
      //     // Write check function
      //     if(username == password){
      //       var user = {
      //         "name": "Abhinav",
      //         "value": "hehe"
      //       };
      //       return callback(null, user);
      //     }
      //     else {
      //       return callback(null, false);
      //     }
      //   }
      // ));
      //
      // passport.serializeUser(function(user, callback) {
      //   return callback(null, "admin");
      // });
      //
      // passport.deserializeUser(function(id, callback) {
      //   return callback(null, "admin");
      // });
    // db.close();
  });
};

module.exports = loginDB;
