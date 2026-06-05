import { kafka } from "../../config/kafka.js";

const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

export const sendLogEvent = async (log) => {
  await producer.send({
    topic: process.env.KAFKA_LOG_TOPIC,
    messages: [
      {
        key: log._id.toString(),
        value: JSON.stringify(log),
      },
    ],
  });
};

export { producer };