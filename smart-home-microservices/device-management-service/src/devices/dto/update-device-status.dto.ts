import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeviceStatusDto {
  @ApiProperty({ enum: ['on', 'off'] })
  status: 'on' | 'off';
}
