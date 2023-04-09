import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserService {
  findOneByUsername(username: string) {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<User> {
      throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}



  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
