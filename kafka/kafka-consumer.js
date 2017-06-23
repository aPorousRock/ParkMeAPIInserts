const kafka = require('kafka-node');
const conf = require('config');
const HighLevelConsumer = kafka.HighLevelConsumer;
const Offset = kafka.Offset;
const Client = kafka.Client;

var kafkaConsumer = function(topic, io) {

  const client = new Client(conf.ZOOKEEPER, 'client-1511');
  const payloads = [{ "topic": topic}];
  const consumer = new HighLevelConsumer(client, payloads);
  const offset = new Offset(client);

  consumer.on('message', function(message) {
    console.log(message.value);
    io.emit("message", message.value);
  });

  consumer.on('error', function(err) {
    console.log(error);
  });
  
};

module.exports = kafkaConsumer;
