import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MongooseModule} from '@nestjs/mongoose';
import { AppService } from './app.service';
import {Hospital,HospitalSchema} from './schema/hospital.schema';
import {Receiver,ReceiverSchema } from './schema/reciever.schema';
import { HospitalService } from './hospital/hospital.service';
import { ReceiverService } from './receiver/receiver.service';
import { HospitalController } from './hospital/hospital.controller';
import { ReceiverController } from './receiver/receiver.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://abhishekbhat888:bhat3348@cluster2.ps03wi5.mongodb.net/test',{dbName: 'bbapi'}),
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
      { name: Receiver.name, schema: ReceiverSchema },
    ]),
    AuthModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, HospitalController, ReceiverController],
  providers: [AppService, HospitalService, ReceiverService],
})
export class AppModule {}
