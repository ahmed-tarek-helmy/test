import { Module } from '@nestjs/common';
import { UsersController } from './controllers/admins/users.controller';
import { UsersService } from './services/admins/users.service';
import { usersProviders } from './providers/users.providers';
import { DbModule } from 'src/DB/db.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthSignInController, AuthSignUpController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';


@Module({
  imports:[DbModule,
  JwtModule.register({
    global: true,
    secret: process.env.TOKEN_SIGNATURE,
    signOptions: { expiresIn: '7200s' },
  }),],
  controllers: [UsersController,AuthSignInController,AuthSignUpController],
  providers: [...usersProviders,UsersService,AuthService]
})
export class UsersModule {}
