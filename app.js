

var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/ParkMe';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
assert.equal(null, err);
console.log("Connected successfully to server");

db.close();
});
/*
var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('Users');
    // Insert some documents
    collection.insertMany([
      {Username : 'ajinkya', Password:'parkar'}, {Username : 'mandar', Password:'kanitkar'}, {Username : 'nimish', Password:'sawant'}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

*/

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('PrivateParking');
  // Insert some documents
  collection.insertMany([
    {Latitude : 40.709931, Longitude:-73.995209,Name:'Water St',Availability:50, Vicinity : 'Water St'}, 
    {Latitude : 40.712634, Longitude:-74.001701,Name:'1 Police Plaza',Availability:38, Vicinity: "Police Dept"}, 
  
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    assert.equal(2, result.ops.length);
    console.log("Inserted 2 documents into the collection");
    callback(result);
  });
}

  var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('PrivateParking');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
  var url = 'mongodb://localhost:27017/ParkMe';
// Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertDocuments(db, function() {
  
  });
  
  findDocuments(db, function() {
    db.close();
    });
});
  