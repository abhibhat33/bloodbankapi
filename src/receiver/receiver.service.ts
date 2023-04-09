import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hospital, HospitalDocument } from 'src/schema/hospital.schema';
import { Receiver, ReceiverDocument } from 'src/schema/reciever.schema';
import { CreateReceiverDto } from 'src/dto/create-receiver.dto';
import { UpdateReceiverDto } from 'src/dto/update-receiver.dto';

@Injectable()
export class ReceiverService {
  constructor(
    @InjectModel(Receiver.name) private receiverModel: Model<ReceiverDocument>,
    @InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>,
  ) {}

  async create(createReceiverDto: CreateReceiverDto): Promise<Receiver> {
    const createdReceiver = new this.receiverModel(createReceiverDto);
    return createdReceiver.save();
  }

  async findAll(): Promise<Receiver[]> {
    return this.receiverModel.find().exec();
  }

  async findOne(id: string): Promise<Receiver> {
    return this.receiverModel.findById(id).exec();
  }

  async update(
    id: string,
    updateReceiverDto: UpdateReceiverDto,
  ): Promise<Receiver> {
    return this.receiverModel.findByIdAndUpdate(id, updateReceiverDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Receiver> {
    return this.receiverModel.findByIdAndRemove(id);
  }

  async requestBlood(
    hospitalId: string,
    receiverId: string,
    bloodGroup: string,
  ): Promise<any> {
    const receiver = await this.receiverModel.findById(receiverId).exec();
    const hospital = await this.hospitalModel.findById(hospitalId).exec();

    if (!receiver || !hospital) {
      throw new Error('Invalid receiver or hospital ID');
    }

    const eligibility = receiver.eligibility[bloodGroup];

    if (!eligibility) {
      throw new Error('Receiver is not eligible for this blood group');
    }

    const request = {
      receiver: receiverId,
      bloodGroup,
      requestedAt: new Date(),
    };

    const updatedHospital = await this.hospitalModel
      .findByIdAndUpdate(
        hospitalId,
        { $push: { requests: request } },
        { new: true },
      )
      .exec();

    return {
      request,
      hospital: updatedHospital,
    };
  }

  async getRequests(hospitalId: string, bloodGroup: string): Promise<any> {
    const hospital = await this.hospitalModel.findById(hospitalId).exec();

    if (!hospital) {
      throw new Error('Invalid hospital ID');
    }

    const requests = hospital.requests.filter(
      (request) => request.bloodGroup === bloodGroup,
    );

    return requests.map((request) => {
      const receiver = hospital.requests.find((r) => r.receiver === request.receiver);
      return {
        ...request.toJSON(),
        receiver: receiver ? receiver.toJSON() : null,
      };
    });
  }
}