#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

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

      var key = 'my.o';

      channel.assertExchange(exchange, 'topic', {
        durable: false
      });

      let i = 0;
      //send three message MSG_1 _2 _3, interval 3 sec. 
      setInterval(() => {
        i++;
        let msg = `MSG_${i}`;
        channel.publish(exchange, key, Buffer.from(msg));
        console.log(msg);
      }, 3000)

    });
    //terminal original.js after 10s (after 3 messages)
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 10000);
  });

}, 10000)

