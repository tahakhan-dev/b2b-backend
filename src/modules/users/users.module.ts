import { BusinessesUserCommandHandler, ChangingPasswordUserCommandHandler, CreateUserCommandHandler, ForgetPasswordCodeUserCommandHandler, LoginUserCommandHandler, ResendForgetPasswordLinkUserCommandHandler, ResetPasswordUserCommandHandler, UpdateBusinessesUserCommandHandler, UpdateProfileUserCommandHandler, VerificationCodeUserCommandHandler, VerificationLinkUserCommandHandler } from './commands.handler';
import { UserForgetPasswordCodeEntity } from './entities/user-forgetpassword-verfication.entity';
import { UserVerificationCodeEntity } from './entities/user-verfication-code.entity';
import { GenerateDigits } from 'src/common/functions/generate-digits';
import { UserConditions } from 'src/common/functions/user-condition';
import { UserValidation } from './functions/user-validation';
import { SendEmail } from 'src/helpers/send-email.helper';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { UserMapper } from './mapper/user.mapper';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { DecryptToken } from 'src/common/functions/decrypt-token';
import { GetProfileUserQueryHandler } from './query.handler';
import { UserBusinessesEntity } from './entities/user-businesses.entity';
import 'dotenv/config';


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity, UserBusinessesEntity]),
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity, UserBusinessesEntity], process.env.CONNECTION_NAME_2),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserMapper,
    GenerateDigits,
    UserConditions,
    UserValidation,
    SendEmail,
    DecryptToken,
    // ---- Command Handler
    CreateUserCommandHandler,
    LoginUserCommandHandler,
    VerificationLinkUserCommandHandler,
    ResendForgetPasswordLinkUserCommandHandler,
    ForgetPasswordCodeUserCommandHandler,
    ResetPasswordUserCommandHandler,
    VerificationCodeUserCommandHandler,
    ChangingPasswordUserCommandHandler,
    UpdateProfileUserCommandHandler,
    BusinessesUserCommandHandler,
    UpdateBusinessesUserCommandHandler,
    //------ Query Handler
    GetProfileUserQueryHandler
  ],
  exports: [UserRepository]
})
export class UsersModule { }
