import { BusinessesUserCommandHandler, ChangingPasswordUserCommandHandler, CreateUserCommandHandler, DeleteBusinessesUserCommandHandler, ForgetPasswordCodeUserCommandHandler, LoginUserCommandHandler, ResendForgetPasswordLinkUserCommandHandler, ResetPasswordUserCommandHandler, UpdateBusinessesUserCommandHandler, UpdateProfileUserCommandHandler, VerificationCodeUserCommandHandler, VerificationLinkUserCommandHandler } from './commands.handler';
import { UserForgetPasswordCodeEntity } from './entities/user-forgetpassword-verfication.entity';
import { GetBusinessesUserQueryHandler, GetProfileUserQueryHandler } from './query.handler';
import { UserVerificationCodeEntity } from './entities/user-verfication-code.entity';
import { UserBusinessesEntity } from './entities/user-businesses.entity';
import { GenerateDigits } from 'src/common/functions/generate-digits';
import { UserConditions } from 'src/common/functions/user-condition';
import { TokenFunctions } from 'src/common/functions/token-generic-function';
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
import { MiddlewareConsumer, Module } from '@nestjs/common';
import 'dotenv/config';
import { ArrayFilterHelper } from 'src/helpers/array-filter.helper';
import { AuthenticationMiddleware } from 'src/middleware/authentication.middleware';
import { RedisModule } from '../redis/redis.module';


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity, UserBusinessesEntity]),
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity, UserBusinessesEntity], process.env.CONNECTION_NAME_2),
    AuthModule,
    RedisModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserMapper,
    GenerateDigits,
    UserConditions,
    ArrayFilterHelper,
    UserValidation,
    SendEmail,
    TokenFunctions,
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
    DeleteBusinessesUserCommandHandler,
    //------ Query Handler
    GetProfileUserQueryHandler,
    GetBusinessesUserQueryHandler
  ],
  exports: [UserRepository]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
