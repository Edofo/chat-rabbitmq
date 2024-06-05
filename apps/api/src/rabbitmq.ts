import amqp, { Message } from "amqplib/callback_api";

const RABBITMQ_URL = "amqp://user:password@localhost:5672";

export const sendMessage = (message: string) => {
  amqp.connect(RABBITMQ_URL, (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
      if (err) throw err;
      const queue = "chat_messages";
      ch.assertQueue(queue, { durable: false });
      ch.sendToQueue(queue, Buffer.from(message));
      console.log(`Sent Rabbitmq: ${message}`);
    });

    setTimeout(() => {
      conn.close();
    }, 500);
  });
};

export const receiveMessage = (callback: (msg: Message) => void) => {
  amqp.connect(RABBITMQ_URL, (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
      if (err) throw err;
      const queue = "chat_messages";
      ch.assertQueue(queue, { durable: false });
      ch.consume(
        queue,
        (msg) => {
          if (msg) {
            console.log(`Received rabbitmq: ${msg.content.toString()}`);
            callback(msg);
          }
        },
        { noAck: true },
      );
    });
  });
};
