import { Consumer, KafkaClient } from 'kafka-node';

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });

export function consumeMessages(
  topic: string,
  callback: (message: string) => void
): void {
  const consumer = new Consumer(client, [{ topic }], { autoCommit: true });

  consumer.on('message', (message) => {
    console.log('Received Kafka message:', message.value);
    callback(message.value.toString());
  });

  consumer.on('error', (err) => {
    console.error('Error consuming Kafka message:', err);
  });
}
