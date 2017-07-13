const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const conf = require('config');
const MongoClient = require("mongodb").MongoClient;

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
    //   passport.use(new Strategy(
    //     function(username, password, callback) {
    //       // Write check function
    //       db.users.findByUsername(username, function(err, user) {
    //         if(err) {
    //           return callback(err);
    //         }
    //
    //         if(!user) {
    //           return callback(null, false);
    //         }
    //
    //         if(user.password != password) {
    //           return callback(null, false);
    //         }
    //
    //         return callback(null, user);
    //       });
    //     }
    //   ));
    //
    //   passport.serializeUser(function(user, callback) {
    //     callback(null, user.id);
    //   });
    //
    //   passport.deserializeUser(function(id, callback) {
    //     db.users.findById(id, function(err, user) {
    //       if(err) {
    //         return callback(err);
    //       }
    //
    //       callback(null, user);
    //     })
    //   });
    // }

      passport.use(new Strategy(
        function(username, password, callback) {
          // Write check function
          console.log(username);
          if(username == password){
            callback(null, username);
          }
          else {
            callback(null, false);
          }
        }
      ));

      passport.serializeUser(function(user, callback) {
        callback(null, "admin");
      });

      passport.deserializeUser(function(id, callback) {
        return callback(null, "admin");
      });
    }

    // db.close();
  });
};

module.exports = loginDB;
