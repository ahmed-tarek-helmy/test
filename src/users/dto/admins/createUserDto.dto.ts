
import { IsString, IsInt, IsEmail, IsStrongPassword, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString({message:"FullName Must Be String"})
  fullName: string;

  @IsInt({message:"Age Must Be Integer"})
  age: number;

  @IsString({message:"Email Must Be String"})
  @IsEmail({},{message:"Email is Not Valid"})
  email: string;

  @IsString({message:"Password Must Be String"})
  @IsStrongPassword()
  password: string;
  @IsEnum(['admin','user','manger'], { message: 'Role must be Admin, User, or Manger' })
  role:string
}
