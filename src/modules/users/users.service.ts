import { ICreateUser, ILoginUser, IVerificationLinkUser, IForgetPasswordCodeUser, IResetPasswordUser, IVerificationCodeUser, IChangingPasswordUser, IUpdateProfileUser, IGetProfileUser } from './interface/res/user.interface';
import { ForgetPasswordCodeUserCommand } from './commands/forget-password-code-user.command';
import { VerificationLinkUserCommand } from './commands/verification-link-user.command';
import { ForgetPasswordCodeUserDto } from './dto/checking-forgetpassword-code-user.dto';
import { VerificationLinkUserDto } from './dto/verification-link-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { LoginUserCommand } from './commands/login-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { ResetPasswordUserCommand } from './commands/reset-password-user.command';
import { VerificationCodeUserDto } from './dto/checking-verification-code-user.dto';
import { VerificationCodeUserCommand } from './commands/verification-code-user.command';
import { ResendForgetPasswordLinkUserDto } from './dto/forget-password-link-user.dto';
import { ResendForgetPasswordLinkCommand } from './commands/resend-forgetpassword-link-user.command';
import { ChangingPasswordUserDto } from './dto/changing-password-user.dto';
import { ChangingPasswordUserCommand } from './commands/changing-password-user.command';
import { UpdateUserProfileUserDto } from './dto/update-profile-user.dto';
import { UpdateProfileUserCommand } from './commands/update-profile-user.command';
import { Request } from 'express';
import 'dotenv/config';
import { GetProfileUserQuery } from './query/get-profile-user.query';


@Injectable()
export class UsersService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,     // commandBus and queryBus, both of which are instances of the CommandBus and QueryBus classes respectively. These classes are likely dependencies of the class or module where this constructor is defined
  ) { }

  async createUserServiceHandler(createUserDto: CreateUserDto): Promise<ICreateUser> {  // The createUserServiceHandler function is defined as an asynchronous function that takes a CreateUserDto object as its argument and returns a Promise of an ICreateUser object.
    return await this.commandBus.execute(  //  the commandBus.execute method is called with a new instance of the CreateUserCommand class, passing the createUserDto object as its argument. This suggests that CreateUserCommand is a command object that is used to create a new user. The execute method is likely defined within the CommandBus class and handles the execution of the command.
      new CreateUserCommand(createUserDto)
    )                                       // createUserServiceHandler function returns the result of the commandBus.execute method call, which is a Promise of the ICreateUser object.
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

  async updateProfileUserServiceHandler(updateUserProfileUserDto: UpdateUserProfileUserDto, request: Request): Promise<IUpdateProfileUser> {
    return await this.commandBus.execute(
      new UpdateProfileUserCommand(updateUserProfileUserDto, request)
    )
  }

  //  ---------------------------------   GET QUERY CALLS ----------------------------------

  async getProfileUserServiceHandler(request: Request): Promise<IGetProfileUser> {
    return await this.queryBus.execute(
      new GetProfileUserQuery(request)
    )
  }

 


}
