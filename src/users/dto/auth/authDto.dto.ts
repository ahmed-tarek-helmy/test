import { IsString, IsInt, IsEmail, IsStrongPassword, MaxLength, MinLength} from 'class-validator';

export class SignInDto {
  @IsString({message:"Email Must Be String"})
  @IsEmail({},{message:"Email is Not Valid"})
  email: string;

  @IsString({message:"Password Must Be String"})
  @IsStrongPassword()
  @MinLength(5,{message:'Password Must Be at Least 5 Characters'})
  @MaxLength(20,{message:'Password Must Be at Less Than 20 Characters'})
  password: string;
}
export class SignUpDto {
  @IsString({message:"FullName Must Be String"})
  fullName: string;

  @IsInt({message:"Age Must Be Integer"})
  age: number;

  @IsString({message:"Email Must Be String"})
  @IsEmail({},{message:"Email is Not Valid"})
  email: string;

  @IsString({message:"Password Must Be String"})
  @IsStrongPassword()
  @IsStrongPassword()
  @MinLength(5,{message:'Password Must Be at Least 5 Characters'})
  @MaxLength(20,{message:'Password Must Be at Less Than 20 Characters'})
  password: string;
  @IsString({message:"cPassword Must Be String"})
  cPassword:string
}

