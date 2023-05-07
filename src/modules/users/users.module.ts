import { CreateUserCommandHandler, LoginUserCommandHandler } from './commands.handler';
import { UserVerificationCodeEntity } from './entities/user-verfication-code.entity';
import { GenerateDigits } from 'src/common/functions/generate-digits';
import { UserConditions } from 'src/common/functions/user-condition';
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
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity]),
    TypeOrmModule.forFeature([UserEntity, UserVerificationCodeEntity], process.env.CONNECTION_NAME_2),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    UserMapper,
    GenerateDigits,
    UserConditions,
    SendEmail,
    // ---- Command Handler
    CreateUserCommandHandler,
    LoginUserCommandHandler,
    //------ Query Handler
    //  ConsumerAccountQueryHandler
  ]
})
export class UsersModule { }
