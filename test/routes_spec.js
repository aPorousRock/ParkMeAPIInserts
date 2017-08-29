var should = require('should');
var app = require('../app.js').app;
var supertest = require('supertest');
var agent = supertest.agent(app);
var username = "abc";
var password = "xyz";

describe ("test API login functions", function() {
//  this.timeout(50000);
  it ("Incorrect login", function (done) {
      supertest(app).get('/incorrectlogin')
      // .send('username=' + username + '&password=' + password)
      .expect(401)
      // .expect(302)
      .end(function(err, res){
          if (err) return done(err);
          done();
      });
  });
});

describe ("Impala test functions", function() {
  it ("Execute Impala query but no query specifed (should fail)", function (done) {
      agent.get('/impala/executeQuery')
      .expect(400)
      .end(function(err, res){
          if (err) return done(err);
          done();
      });
  });
});

describe ("Kafka test functions", function() {
  it ("Execute kafka query but no topic specifed (should fail)", function (done) {
      agent.get('/startStreamingBuffered')
      .expect(400)
      .end(function(err, res){
          if (err) return done(err);
          done();
      });
  });

  it ("Execute kafka query and topic specifed", function (done) {
      agent.get('/startStreamingBuffered?topic="IBM295207"')
      // .send('username=' + username + '&password=' + password)
      .expect(200)
      // .expect(302)
      .end(function(err, res){
          if (err) return done(err);
          done();
      });
  });

  it ("Execute kafka query stop streaming", function (done) {
      agent.get('/stopStreamingBuffered')
      .expect(200)
      .end(function(err, res){
          if (err) return done(err);
          done();
      });
  });

});
