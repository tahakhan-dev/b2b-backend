import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ICreateUser, IForgetPasswordCodeUser, ILoginUser, IResetPasswordUser, IVerificationCodeUser, IVerificationLinkUser } from './interface/res/user.interface';
import { IResponseWrapper } from 'src/interface/base.response.interface';
import { StatusCodes } from 'src/common/enums/status-codes';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Status } from 'src/common/enums/status';
import { UsersService } from './users.service';
import { Response } from 'express';
import { VerificationLinkUserDto } from './dto/verification-link-user.dto';
import { ForgetPasswordCodeUserDto } from './dto/checking-forgetpassword-code-user.dto';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { VerificationCodeUserDto } from './dto/checking-verification-code-user.dto';
import { ResendForgetPasswordLinkUserDto } from './dto/forget-password-link-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<ICreateUser> {

    try {

      const createdUser = await this.usersService.createUserServiceHandler(createUserDto);

      res.status(Number(createdUser.StatusCode)).json(createdUser)
    } catch (error) {

      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }


  @Post('login')
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto): Promise<ILoginUser> {

    try {
      const loginUser = await this.usersService.LoginUserServiceHandler(loginUserDto);
      res.status(Number(loginUser.StatusCode)).json(loginUser)
    } catch (error) {

      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }

  @Post('resend_verfication_link')
  async resendVerificationLink(@Res() res: Response, @Body() verificationLinkUserDto: ResendForgetPasswordLinkUserDto): Promise<IVerificationLinkUser> {

    try {
      const ResendVerificationLink = await this.usersService.VerificationLinkUserServiceHandler(verificationLinkUserDto);
      res.status(Number(ResendVerificationLink.StatusCode)).json(ResendVerificationLink)
    } catch (error) {
      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }

  @Post('resend_forgetpassword_link')
  async resendForgetPasswordLink(@Res() res: Response, @Body() resendForgetPasswordLinkUserDto: ResendForgetPasswordLinkUserDto): Promise<IVerificationLinkUser> {

    try {
      const ResendForgetPasswordLink = await this.usersService.resendForgetPasswordLinkUserServiceHandler(resendForgetPasswordLinkUserDto);
      res.status(Number(ResendForgetPasswordLink.StatusCode)).json(ResendForgetPasswordLink)
    } catch (error) {
      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }

  @Post('checking_forgetpassword_code')
  async checkingForgetpasswordCode(@Res() res: Response, @Body() forgetPasswordCodeUserDto: ForgetPasswordCodeUserDto): Promise<IForgetPasswordCodeUser> {

    try {
      const ForgetPasswordCode = await this.usersService.checkingForgetPasswordCodeUserServiceHandler(forgetPasswordCodeUserDto);
      res.status(Number(ForgetPasswordCode.StatusCode)).json(ForgetPasswordCode)
    } catch (error) {
      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }

  @Post('checking_verification_code')
  async checkingVerificationCode(@Res() res: Response, @Body() verificationCodeUserDto: VerificationCodeUserDto): Promise<IVerificationCodeUser> {

    try {
      const VerificationCode = await this.usersService.checkingVerificationCodeUserServiceHandler(verificationCodeUserDto);
      res.status(Number(VerificationCode.StatusCode)).json(VerificationCode)
    } catch (error) {
      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }

  @Post('reset_user_password')
  async resetUserPassword(@Res() res: Response, @Body() resetPasswordUserDto: ResetPasswordUserDto): Promise<IResetPasswordUser> {

    try {
      const ResetPassword = await this.usersService.resetPasswordUserServiceHandler(resetPasswordUserDto);
      res.status(Number(ResetPassword.StatusCode)).json(ResetPassword)
    } catch (error) {
      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }
  

}
