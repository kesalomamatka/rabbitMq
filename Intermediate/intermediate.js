
let amqp = require('amqplib/callback_api');

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
      var key = 'my.i';
      var msg = 'Message from ingemediate!';

      channel.assertExchange(exchange, 'topic', {
        durable: false
      });

      channel.assertQueue('', {
        exclusive: true
      }, function (error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(' [*] Waiting for logs. To exit press CTRL+C');

        channel.bindQueue(q.queue, exchange, 'my.o');
        //get message from my.o and publish to pu.i
        channel.consume(q.queue, function (msg) {
          let returnString = "Got " + msg.content.toString();
          console.log(returnString);
          setTimeout(() => {
            channel.publish(exchange, key, Buffer.from(returnString));
          }, 1000);

        }, {
          noAck: true
        });

      });
    });
  });

}, 10000)
