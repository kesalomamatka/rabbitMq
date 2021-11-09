#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq3', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'topic_logs';

    var key =  'my.o';

    channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    let i=0;
    setInterval(()=>{
        i++;
        let msg = `MSG_${i}`;
        channel.publish(exchange, key, Buffer.from(msg));
        console.log(msg);
    },3000)

  });

  setTimeout(function() {
    connection.close();
    process.exit(0);
}, 10000);
});