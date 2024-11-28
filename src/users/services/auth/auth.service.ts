import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { SignInDto, SignUpDto } from "src/users/dto/auth/authDto.dto";
import { Users } from "src/users/interfaces/users.interface";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(@Inject('USER_MODEL')private userModel: Model<Users>,private jwtService: JwtService) {}
/****************************SignIn************************************************** */
    async signIn(body:SignInDto){
        const {email,password}=body;
        const user=await this.userModel.findOne({email})
        if(!user){
            throw new NotFoundException()
        }
        const match=bcrypt.compareSync(password,user.password);
            if(!match){
                throw new NotFoundException()
    }
    //Create Token
    const payload={id:user._id,isLoggedIn:true,role:user.role}
    const token = this.jwtService.sign(payload,{
        secret:"mada"
    })
        return {Msg:"Done",token }
    }
/****************************SignUp************************************************** */
async signUp(body:SignUpDto){
        const {fullName,cPassword,email,password,age}=body;
        if(password!=cPassword){
            throw new BadRequestException("Password Not Match")
        }
    const user =await this.userModel.findOne({email});
    if(user){
        throw new BadRequestException("Email Exist")
    }
    const saltOrRounds = parseInt(process.env.SALT_ROUND);
    const hash = bcrypt.hashSync(password, saltOrRounds);
    const createUser=await this.userModel.create({fullName,email,password:hash,cPassword,age,role:'user'})
     //Create Token
    //  const payload={id:createUser._id,isLoggedIn:true,role:createUser.role}
    //  const token = this.jwtService.sign(payload,{
    //      secret:"mada"
    //  })
        return {Msg:"SignUp",data:createUser}
    }

}