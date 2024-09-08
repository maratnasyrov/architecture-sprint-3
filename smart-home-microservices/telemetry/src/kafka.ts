import { Kafka, EachMessagePayload } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS || 'kafka:29092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-group' });

export async function initializeKafka(): Promise<void> {
  await producer.connect();
  await consumer.connect();
}

export async function shutdownKafka(): Promise<void> {
  await producer.disconnect();
  await consumer.disconnect();
}

export async function produceMessage(
  topic: string,
  message: string
): Promise<void> {
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
}

export async function consumeMessages(
  topic: string,
  callback: (message: EachMessagePayload) => Promise<void>
): Promise<void> {
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: callback,
  });
}
