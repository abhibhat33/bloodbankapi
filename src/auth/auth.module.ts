import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth/auth.service';
import { LocalStrategy } from 'src/auth/auth/local.strategy';
import { JwtStrategy } from 'src/auth/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from 'src/auth/auth/local-auth.guard';
import { AuthController } from 'src/auth/auth/auth.controller';


@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
