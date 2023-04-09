import { IsString, IsEmail, IsOptional, IsEnum, Length } from 'class-validator';
import { UserRole } from 'src/user/user/user-role.enum';


export class UserDto {
    @IsString()
    @IsEmail()
    readonly email: string;
  
    @IsString()
    @Length(8, 20)
    readonly password: string;
  
    @IsOptional()
    @IsEnum(UserRole)
    readonly role: UserRole;
  }
  