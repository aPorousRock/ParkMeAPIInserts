const kafka = require('kafka-node');
const conf = require('config');
const HighLevelConsumer = kafka.HighLevelConsumer;
const Offset = kafka.Offset;
const Client = kafka.Client;

var kafkaConsumerEnriched = function(topic, io) {

  const client = new Client(conf.ZOOKEEPER, 'client-1645');
  const payloads = [{ "topic": topic}];
  const options = {
    groupId: 'kafka-node-group45',
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    fetchMaxWaitMs: 100,
    fetchMinBytes: 1,
    fetchMaxBytes: 1024 * 1024,
    fromOffset: false,
    encoding: 'utf8'
  };
  const consumer = new HighLevelConsumer(client, payloads, options);
  const offset = new Offset(client);

  var messages = [];

  // Setup the IO Client
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
  });

  consumer.on('message', function(message) {
      const value = JSON.parse(message.value);
      messages.push(JSON.stringify(value));
      if(messages.length == 10){
        io.emit("enrichedmessage", messages);
        messages = [];
      }
    });

  consumer.on('error', function(err) {
    console.log(err);
  });

};

module.exports = kafkaConsumerEnriched;
