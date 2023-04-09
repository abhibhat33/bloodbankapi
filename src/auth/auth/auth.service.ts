import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user/user.service';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  validateUser(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
  userRepository: any;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }
  


  async login(user: User) {
    const payload = { userId: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
