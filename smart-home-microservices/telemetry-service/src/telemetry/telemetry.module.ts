import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryData } from './telemetry.entity';
import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelemetryData])],
  controllers: [TelemetryController],
  providers: [TelemetryService],
})
export class TelemetryModule {}
