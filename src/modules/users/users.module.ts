import { CreateUserCommandHandler, ForgetPasswordCodeUserCommandHandler, LoginUserCommandHandler, ResendForgetPasswordLinkUserCommandHandler, ResetPasswordUserCommandHandler, VerificationLinkUserCommandHandler } from './commands.handler';
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
import 'dotenv/config';


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity]),
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity], process.env.CONNECTION_NAME_2),
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
    // ---- Command Handler
    CreateUserCommandHandler,
    LoginUserCommandHandler,
    VerificationLinkUserCommandHandler,
    ResendForgetPasswordLinkUserCommandHandler,
    ForgetPasswordCodeUserCommandHandler,
    ResetPasswordUserCommandHandler
    //------ Query Handler
    //  ConsumerAccountQueryHandler
  ]
})
export class UsersModule { }
