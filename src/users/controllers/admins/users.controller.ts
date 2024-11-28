import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../services/admins/users.service';
import { CreateUserDto } from '../../dto/admins/createUserDto.dto';
import { UpdateUserDto } from '../../dto/admins/updateUserDto.dto';
import { Roles } from '../../decorators/roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';

@Controller('user')
@UseGuards(UsersGuard)
export class UsersController {
    constructor(private readonly userService:UsersService){}
    //************************************************************************** */
    //@Desc  Get all users 
    //@Route Get /users
    //@Access Private [Admin,Manger]
    @Roles(['admin','manger'])
    @Get()
        getAllUsers(){
        return this.userService.getAllUsers()
    }
    //************************************************************************** */
    //@Desc  Get All User By ID 
    //@Route Get /user/:userId
    //@Access Private [Admin,Manger,User]
    @Roles(['admin','manger'])
    @Get(':userId')
        getAllUsersById(@Param('userId') userId:string){
            
        return this.userService.getAllUsersById(userId)
    }
    //************************************************************************** */
    //@Desc  Create User
    //@Route Post /user
    //@Access Private [Admin,Manger,User]
    @Roles(['admin'])
    @Post()
        createUser(@Body(new ValidationPipe({whitelist:true ,forbidNonWhitelisted:true}))
        createUserDto:CreateUserDto
    ){     
        return this.userService.createUser(createUserDto)
    }
    //************************************************************************** */
    //@Desc  Update User
    //@Route Put /user/:userId
    //@Access Private [Admin,Manger,User]
    @Roles(['admin','manger'])
    @Put(':userId')
    updateUser(@Param('userId')userId:string, @Body(new ValidationPipe({whitelist:true ,forbidNonWhitelisted:true}))
     updateUserDto:UpdateUserDto
    ){ 
        return this.userService.updateUser(userId,updateUserDto)
    }
    //************************************************************************** */
        //@Desc  Delete User
    //@Route Delete /user/:userId
    //@Access Private [Admin,Manger,User]
    @Roles(['admin'])
    @Delete(':userId')
    deleteUser(@Param('userId')userId:string)
     
    { 
        return this.userService.deleteUser(userId)
    }
    //************************************************************************** */
}
