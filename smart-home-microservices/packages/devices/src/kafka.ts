import { Producer, KafkaClient } from 'kafka-node';

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

export function produceMessage(topic: string, message: string): void {
  producer.send([{ topic, messages: [message] }], (err, data) => {
    if (err) console.error('Error producing Kafka message:', err);
    else console.log('Kafka message sent:', data);
  });
}
