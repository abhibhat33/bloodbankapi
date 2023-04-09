import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { CreateReceiverDto } from 'src/dto/create-receiver.dto';
import { UpdateReceiverDto } from 'src/dto/update-receiver.dto';

@Controller('receiver')
export class ReceiverController {
  constructor(private readonly receiverService: ReceiverService) {}

  @Post()
  create(@Body() createReceiverDto: CreateReceiverDto) {
    return this.receiverService.create(createReceiverDto);
  }

  @Get()
  findAll() {
    return this.receiverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiverDto: UpdateReceiverDto) {
    return this.receiverService.update(id, updateReceiverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiverService.remove(id);
  }

  @Post(':id/request')
  requestBlood(@Param('id') receiverId: string, @Body() request: any) {
    return this.receiverService.requestBlood(receiverId, request.hospitalId, request.bloodGroup);
  }
}
