import { Model, Types } from 'mongoose';
import { Injectable ,Inject, NotFoundException, ConflictException, BadRequestException} from '@nestjs/common';
import { Users } from '../../interfaces/users.interface';
import { CreateUserDto } from '../../dto/admins/createUserDto.dto';
import { UpdateUserDto } from '../../dto/admins/updateUserDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL')private userModel: Model<Users>) {}
    /***********************Get Users ********************************* */
    async getAllUsers():Promise<{data:Users[],count:number,status:string}>{
        const users= await this.userModel.find().select('-_id fullName email age');
        return {data:users,count:users.length,status:"Done"}
    }
    /***********************Get User By Id********************************* */
    async getAllUsersById(userId:string):Promise<Users>{
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid User ID');
          }
        // console.log(userId)
        const user= await this.userModel.findById(userId).select('-_id fullName email age');
        if(!user){
            throw new NotFoundException
        }
        return user
    }
    /***********************Create User********************************* */
    async createUser(createUserDto:CreateUserDto):Promise<Users>{
        // console.log(createUserDto)
        const {fullName,email,password,age,role}=createUserDto;
        const user=await this.userModel.findOne({email})
        if(user){
            throw new ConflictException('Email is Exist')
        }
        // const createUser= new this.userModel(createUserDto);
        // return createUser.save()
        const saltOrRounds = parseInt(process.env.SALT_ROUND);
        const hash = bcrypt.hashSync(password, saltOrRounds);
        const createUser= await this.userModel.create({fullName,email,password:hash,age,role});
        return createUser
    }
    /***********************Update User********************************* */
    async updateUser(userId:string,updateUserDto:UpdateUserDto){
        console.log(updateUserDto)
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid User ID');
          }
        const user=await this.userModel.findByIdAndUpdate(userId,updateUserDto,{new:true}).select('-_id fullName email age')
        if(!user){
                throw new NotFoundException("User Not Found")
        }
       
        return {Msg:"Updated",user}
    }
    /***********************Delete User********************************* */
    async deleteUser(userId:string){
        console.log(userId)
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid User ID');
          }
        const user=await this.userModel.findByIdAndDelete(userId)
        if(!user){
                throw new NotFoundException("User Not Found")
        }
        return {Msg:"Deleted",user}
    }
}
