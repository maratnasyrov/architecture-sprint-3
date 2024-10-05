import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TelemetryData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceId: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column('float')
  temperature: number;
}
