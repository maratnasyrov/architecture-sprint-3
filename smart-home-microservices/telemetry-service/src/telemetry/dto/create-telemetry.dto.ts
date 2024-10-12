import { ApiProperty } from '@nestjs/swagger';

export class CreateTelemetryDto {
  @ApiProperty()
  deviceId: number;

  @ApiProperty({ type: String, format: 'date-time' })
  timestamp: string;

  @ApiProperty()
  temperature: number;
}
