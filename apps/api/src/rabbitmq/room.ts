// Create a new room (queue) in RabbitMQ when a client emits a create-room event
// Join a room (queue) in RabbitMQ when a client emits a join-room event

import { rabbitmqConn } from "./rabbitmq";

const createRoom = (roomId: string) => {
  rabbitmqConn.createChannel((err, ch) => {
    if (err) throw err;
    ch.assertQueue(roomId, { durable: false });
  });
  console.log(`Queue room rabbit ${roomId} created`);
};

const deleteRoom = (roomId: string) => {
  rabbitmqConn.createChannel((err, ch) => {
    if (err) throw err;
    ch.deleteQueue(roomId);
  });
  console.log(`Queue room rabbit ${roomId} deleted`);
};

const sendMessageToRoom = (roomId: string, message: string) => {
  rabbitmqConn.createChannel((err, ch) => {
    if (err) throw err;
    ch.sendToQueue(roomId, Buffer.from(message));
  });
  console.log(`Sent Rabbitmq: ${message}`);
};

const receiveMessageFromRoom = (
  roomId: string,
  callback: (msg: any) => void,
) => {
  rabbitmqConn.createChannel((err, ch) => {
    if (err) throw err;
    ch.consume(
      roomId,
      (msg) => {
        if (msg) {
          console.log(`Received message rabbitmq: ${msg.content.toString()}`);
          callback(msg);
        }
      },
      { noAck: true },
    );
  });
};

export { createRoom, deleteRoom };
export { sendMessageToRoom, receiveMessageFromRoom };
