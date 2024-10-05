import { Controller, Post, Body } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('telemetry')
@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post()
  @ApiOperation({ summary: 'Приём данных телеметрии' })
  receiveTelemetry(@Body() createTelemetryDto: CreateTelemetryDto) {
    return this.telemetryService.create(createTelemetryDto);
  }
}
