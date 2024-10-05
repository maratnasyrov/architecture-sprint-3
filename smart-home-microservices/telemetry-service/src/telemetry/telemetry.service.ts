import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelemetryData } from './telemetry.entity';
import { Repository } from 'typeorm';
import { CreateTelemetryDto } from './dto';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(TelemetryData)
    private telemetryRepository: Repository<TelemetryData>,
  ) {}

  create(createTelemetryDto: CreateTelemetryDto): Promise<TelemetryData> {
    const telemetryData = this.telemetryRepository.create(createTelemetryDto);
    return this.telemetryRepository.save(telemetryData);
  }
}
