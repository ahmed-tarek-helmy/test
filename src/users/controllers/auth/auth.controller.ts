import { Body, Controller, Post,ValidationPipe } from "@nestjs/common";
import { AuthService } from './../../services/auth/auth.service';
import { SignInDto, SignUpDto } from "src/users/dto/auth/authDto.dto";




// @UseGuards(UsersGuard)
@Controller('signIn')
export class AuthSignInController{
    constructor(private readonly authService:AuthService){}
    //@Desc  can any user SignIn 
    //@Route Post /SignIn
    //@Access Private [Admin,Manger,User]
    @Post()
    // @Roles(['admin','manger','user'])
    signIn(@Body(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}))body:SignInDto){
        return this.authService.signIn(body);
    }
}
/****************************************************************************************************** */
// @UseGuards(UsersGuard)
@Controller('signUp')
export class AuthSignUpController{
    constructor(private readonly authService:AuthService){}
    //@Desc  can any user SignUp 
    //@Route Post /SignUp
    //@Access Private [User]
    @Post()
    // @Roles(['admin','manger','user'])
    signUp(@Body(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}))body:SignUpDto){
        return this.authService.signUp(body)
    }
}