import { ICreateUser, ILoginUser, IVerificationLinkUser, IForgetPasswordCodeUser, IResetPasswordUser, IVerificationCodeUser, IChangingPasswordUser } from './interface/res/user.interface';
import { ForgetPasswordCodeUserCommand } from './commands/forget-password-code-user.command';
import { VerificationLinkUserCommand } from './commands/verification-link-user.command';
import { ForgetPasswordCodeUserDto } from './dto/checking-forgetpassword-code-user.dto';
import { VerificationLinkUserDto } from './dto/verification-link-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { LoginUserCommand } from './commands/login-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { ResetPasswordUserCommand } from './commands/reset-password-user.command';
import { VerificationCodeUserDto } from './dto/checking-verification-code-user.dto';
import { VerificationCodeUserCommand } from './commands/verification-code-user.command';
import { ResendForgetPasswordLinkUserDto } from './dto/forget-password-link-user.dto';
import { ResendForgetPasswordLinkCommand } from './commands/resend-forgetpassword-link-user.command';
import { ChangingPasswordUserDto } from './dto/changing-password-user.dto';
import { ChangingPasswordUserCommand } from './commands/changing-password-user.command';


@Injectable()
export class UsersService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    // @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    // @InjectRepository(UserEntity, process.env.CONNECTION_NAME_2)
    // private userRepositorySlave: Repository<UserEntity>,
  ) { }

  async createUserServiceHandler(createUserDto: CreateUserDto): Promise<ICreateUser> {
    return await this.commandBus.execute(
      new CreateUserCommand(createUserDto)
    )
  }

  async LoginUserServiceHandler(loginUserDto: LoginUserDto): Promise<ILoginUser> {
    return await this.commandBus.execute(
      new LoginUserCommand(loginUserDto)
    )
  }

  async VerificationLinkUserServiceHandler(verificationLinkUserDto: VerificationLinkUserDto): Promise<IVerificationLinkUser> {
    return await this.commandBus.execute(
      new VerificationLinkUserCommand(verificationLinkUserDto)
    )
  }

  async resendForgetPasswordLinkUserServiceHandler(resendForgetPasswordLinkUserDto: ResendForgetPasswordLinkUserDto): Promise<IVerificationLinkUser> {
    return await this.commandBus.execute(
      new ResendForgetPasswordLinkCommand(resendForgetPasswordLinkUserDto)
    )
  }

  async checkingForgetPasswordCodeUserServiceHandler(forgetPasswordCodeUserDto: ForgetPasswordCodeUserDto): Promise<IForgetPasswordCodeUser> {
    return await this.commandBus.execute(
      new ForgetPasswordCodeUserCommand(forgetPasswordCodeUserDto)
    )
  }

  async checkingVerificationCodeUserServiceHandler(verificationCodeUserDto: VerificationCodeUserDto): Promise<IVerificationCodeUser> {
    return await this.commandBus.execute(
      new VerificationCodeUserCommand(verificationCodeUserDto)
    )
  }

  async resetPasswordUserServiceHandler(resetPasswordUserDto: ResetPasswordUserDto): Promise<IResetPasswordUser> {
    return await this.commandBus.execute(
      new ResetPasswordUserCommand(resetPasswordUserDto)
    )
  }

  async changingPasswordUserServiceHandler(changingPasswordUserDto: ChangingPasswordUserDto): Promise<IChangingPasswordUser> {
    return await this.commandBus.execute(
      new ChangingPasswordUserCommand(changingPasswordUserDto)
    )
  }
}
