import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto, UpdateDeviceStatusDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: 'Регистрация нового устройства' })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Обновление статуса устройства' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateDeviceStatusDto,
  ) {
    return this.devicesService.updateStatus(+id, updateStatusDto.status);
  }
}
