
import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
//Self Classes
import { Roles } from '../decorators/roles.decorator';


@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
              private reflector: Reflector,
              private jwtService: JwtService
          ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles=this.reflector.get(Roles,context.getHandler());
    if(!roles){
      return true 
    }
    //Get Token
    const request = context.switchToHttp().getRequest();
    const token = (request.headers.authorization||"  ").split(' ',2)[1];
    
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: "mada"
        }
      );
      if(roles.includes(payload.role.toLowerCase())){
        return true 
      } else {
      throw new UnauthorizedException();
      }
      
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

}
