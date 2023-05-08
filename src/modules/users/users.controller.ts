import { IChangingPasswordUser, ICreateUser, IForgetPasswordCodeUser, ILoginUser, IResetPasswordUser, IVerificationCodeUser, IVerificationLinkUser } from './interface/res/user.interface';
import { ForgetPasswordCodeUserDto } from './dto/checking-forgetpassword-code-user.dto';
import { ResendForgetPasswordLinkUserDto } from './dto/forget-password-link-user.dto';
import { VerificationCodeUserDto } from './dto/checking-verification-code-user.dto';
import { ChangingPasswordUserDto } from './dto/changing-password-user.dto';
import { Controller, Get, Post, Body, Res, UseGuards } from '@nestjs/common';
import { IResponseWrapper } from 'src/interface/base.response.interface';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { hasRoles } from '../auth/guards/decorators/roles.decorator';
import { StatusCodes } from 'src/common/enums/status-codes';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/common/enums/user-role';
import { LoginUserDto } from './dto/login-user.dto';
import { Status } from 'src/common/enums/status';
import { UsersService } from './users.service';
import { Response } from 'express';

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


  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('changing_password')
  async changingUserPassword(@Res() res: Response, @Body() changingPasswordUserDto: ChangingPasswordUserDto): Promise<IChangingPasswordUser> {

    try {
      const ChangingPassword = await this.usersService.changingPasswordUserServiceHandler(changingPasswordUserDto);
      res.status(Number(ChangingPassword.StatusCode)).json(ChangingPassword)
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
