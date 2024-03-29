
var amqp = require('amqplib/callback_api');
const fs = require('fs');

//If file not exist then create the file. Store message in file
fs.writeFile('./sharedVolume/output.txt', '', function (err) {
  if (err) return console.log(err);
});

//wait for it sh not working will in windows, use set time out to slow down container start since rabbitmq need to run first.

setTimeout(function () {

  //establish connection
  amqp.connect('amqp://rabbitmq3', function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = 'topic_logs';
      //topic exchange
      channel.assertExchange(exchange, 'topic', {
        durable: false
      });

      channel.assertQueue('', {
        exclusive: true
      }, function (error2, q) {
        if (error2) {
          throw error2;
        }
        channel.bindQueue(q.queue, exchange, '#');
        //get message and save into file
        channel.consume(q.queue, function (msg) {
          //test log in console console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
          let date = new Date();
          let formString = date.toISOString() + " Topic " + msg.fields.routingKey + ":" + msg.content.toString() + "\n";
          fs.appendFile('./sharedVolume/output.txt', formString, function (err) {
            if (err) return console.log(err);
          });

        }, {
          noAck: true
        });
      });
    });
  });

}, 10000)
