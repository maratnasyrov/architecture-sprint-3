import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './devices.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = this.devicesRepository.create(createDeviceDto);
    return this.devicesRepository.save(device);
  }

  async updateStatus(id: number, status: 'on' | 'off'): Promise<void> {
    await this.devicesRepository.update(id, { status });
    // Опционально: публикуйте статус в Kafka
  }
}
