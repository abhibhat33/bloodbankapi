import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HospitalService } from 'src/hospital/hospital.service';
import { CreateHospitalDto } from 'src/dto/create-hospital.dto';
import { UpdateHospitalDto } from 'src/dto/update-hospital.dto';
import {model} from 'mongoose';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto);
  }

  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalService.update(id, updateHospitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(id);
  }

  @Get(':id/requests/:bloodGroup')
  getBloodRequests(@Param('id') id: string, @Param('bloodGroup') bloodGroup: string) {
    return this.hospitalService.getBloodRequests(id, bloodGroup);
  }
}
