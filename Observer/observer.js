
var amqp = require('amqplib/callback_api');
const fs= require('fs');

amqp.connect('amqp://rabbitmq3', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'topic_logs';

    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      channel.bindQueue(q.queue, exchange, '#');

      channel.consume(q.queue, function(msg) {
        //test log in console console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        let date = new Date();
        let formString = date.toISOString()+ " Topic " + msg.fields.routingKey + ":" +msg.content.toString()+"\n";
        fs.appendFile('output.txt', formString, function (err) {
            if (err) return console.log(err);
          });

      }, {
        noAck: true
      });
    });
  });
});