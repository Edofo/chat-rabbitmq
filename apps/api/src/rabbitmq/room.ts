import { rabbitmqConn } from "./rabbitmq";

const createRoom = async (roomId: string, callback?: () => void) => {
  await new Promise((resolve, reject) => {
    rabbitmqConn.createChannel((err, ch) => {
      if (err) throw err;
      ch.assertQueue(roomId, { durable: false });
      if (callback) callback();
    });
    resolve(true);
  });
  console.log(`Queue room rabbitmq: ${roomId} created`);
};

const deleteRoom = async (roomId: string) => {
  await new Promise((resolve, reject) => {
    rabbitmqConn.createChannel((err, ch) => {
      if (err) {
        reject(err);
      }
      ch.deleteQueue(roomId);
    }),
      resolve(true);
  });
  console.log(`Queue room rabbitmq: ${roomId} deleted`);
};

const sendMessageToQueue = (roomId: string, message: string) => {
  rabbitmqConn.createChannel((err, ch) => {
    if (err) throw err;
    ch.sendToQueue(roomId, Buffer.from(message));
  });
  console.log(`Sent message rabbitmq: ${message}`);
};

const receiveMessageFromQueue = (
  roomId: string,
  callback: (msg: any) => void,
) => {
  rabbitmqConn.createChannel((err, ch) => {
    if (err) throw err;
    ch.consume(roomId, (msg) => {
      if (msg) {
        callback(msg);
      }
    });
  });
};

// const retrieveAllMessagesFromQueue = (roomId: string) => {
//   rabbitmqConn.createChannel((err, ch) => {
//     if (err) throw err;
//     ch.consume(roomId, (msg) => {
//       if (msg) {
//         console.log(`Received message rabbitmq: ${msg.content.toString()}`);
//       }
//     });
//   });
// };

export { createRoom, deleteRoom };
export { sendMessageToQueue, receiveMessageFromQueue };
