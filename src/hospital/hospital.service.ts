import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hospital, HospitalDocument } from 'src/schema/hospital.schema';
import { CreateHospitalDto } from 'src/dto/create-hospital.dto';
import { UpdateHospitalDto } from 'src/dto/update-hospital.dto';

@Injectable()
export class HospitalService {
  receiverModel: any;
  constructor(
    @InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>,
  ) {}

  async create(createHospitalDto: CreateHospitalDto): Promise<Hospital> {
    const createdHospital = new this.hospitalModel(createHospitalDto);
    return createdHospital.save();
  }

  async findAll(): Promise<Hospital[]> {
    return this.hospitalModel.find().exec();
  }

  async findOne(id: string): Promise<Hospital> {
    return this.hospitalModel.findById(id).exec();
  }

  async update(
    id: string,
    updateHospitalDto: UpdateHospitalDto,
  ): Promise<Hospital> {
    return this.hospitalModel.findByIdAndUpdate(id, updateHospitalDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Hospital> {
    return this.hospitalModel.findByIdAndRemove(id);
  }

  async findRequests(bloodGroup: string, hospitalId: string): Promise<any> {
    return this.hospitalModel
      .findById(hospitalId)
      .populate({
        path: 'requests',
        match: { bloodGroup: bloodGroup },
      })
      .exec();
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
      .populate('requests.receiver')
      .exec();

    return updatedHospital.requests.filter((req) => req.bloodGroup === bloodGroup);
  }
  async getBloodRequests(hospitalId: string, bloodGroup: string): Promise<any> {
    const hospital = await this.hospitalModel.findById(hospitalId).exec();
    if (!hospital) {
      throw new Error('Invalid hospital ID');
    }
  
    const requests = hospital.requests[bloodGroup];
    if (!requests) {
      return [];
    }
  
    const receiverIds = requests.map((request) => request.receiver);
    const receivers = await this.receiverModel.find({ _id: { $in: receiverIds } }).exec();
  
    return requests.map((request) => ({
      ...request.toJSON(),
      receiver: receivers.find((r) => r.id === request.receiver),
    }));
  }
  

}
