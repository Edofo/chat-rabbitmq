import amqp from "amqplib/callback_api";

const RABBITMQ_URL = "amqp://user:password@localhost:5672";

export let rabbitmqConn: amqp.Connection;

export const initRabbitmq = async () => {
  const conn = await new Promise<amqp.Connection>((resolve, reject) => {
    amqp.connect(RABBITMQ_URL, (err, conn) => {
      if (err) {
        reject(err);
      }
      resolve(conn);
    });
  });

  rabbitmqConn = conn;
  return conn;
};
