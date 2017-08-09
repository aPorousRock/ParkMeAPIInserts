const kafka = require('kafka-node');
const conf = require('config');
const HighLevelConsumer = kafka.HighLevelConsumer;
const Offset = kafka.Offset;
const Client = kafka.Client;

var kafkaConsumerBuffered = function(topic, io) {

  var self = this;
  self.rawMessages = [];
  self.enrichedMessages = [];
  const client = new Client('9.45.245.136:2181', 'client-7');
  const payloads = [{ "topic": topic}];
  const options = {
    groupId: 'kafka-node-group7',
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    fetchMaxWaitMs: 100,
    fetchMinBytes: 1,
    fetchMaxBytes: 1024 * 1024,
    fromOffset: false,
    encoding: 'utf8'
  };

  self.consumer = new HighLevelConsumer(client, payloads, options);
  const offset = new Offset(client);

  self.consumer.on('message', function(message) {
    const value = JSON.parse(message.value);
    const key = message.key;
    self.rawMessages.push(value);
    self.enrichedMessages.push(value);
    if(self.rawMessages.length == 10){
      io.emit("messages", self.rawMessages);
      self.rawMessages = [];
    };
  });

  self.consumer.on('error', function(err) {
    console.log(err);
  });

  self.close = function(cb) {
    self.consumer.close();
    cb(self.enrichedMessages);
  }

  return self;
};

module.exports = kafkaConsumerBuffered;
