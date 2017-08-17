const kafka = require('kafka-node');
const conf = require('config');
const HighLevelConsumer = kafka.HighLevelConsumer;
const Offset = kafka.Offset;
const Client = kafka.Client;
const GROUP_ID = "kafka-node-group4";
const CLIENT = "client-4";

var kafkaConsumerBuffered = function(topic, io) {

  var self = this;
  self.enrichedMessages = [];
  const client = new Client(conf.ZOOKEEPER, CLIENT);
  const payloads = [{ "topic": topic}];
  const options = {
    groupId: GROUP_ID,
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
    self.enrichedMessages.push(value);
    if(self.enrichedMessages.length == 10){
      io.emit("messages", self.enrichedMessages);
      self.enrichedMessages = [];
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
