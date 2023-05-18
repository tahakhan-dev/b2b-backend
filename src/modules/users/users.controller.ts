import { IAddBusinessUser, IChangingPasswordUser, ICreateUser, IForgetPasswordCodeUser, IGetBusinessesUser, IGetProfileUser, ILoginUser, IResetPasswordUser, IUpdateBusinessUser, IUpdateProfileUser, IVerificationCodeUser, IVerificationLinkUser } from './interface/res/user.interface';
import { ForgetPasswordCodeUserDto } from './dto/checking-forgetpassword-code-user.dto';
import { ResendForgetPasswordLinkUserDto } from './dto/forget-password-link-user.dto';
import { VerificationCodeUserDto } from './dto/checking-verification-code-user.dto';
import { Controller, Get, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { ChangingPasswordUserDto } from './dto/changing-password-user.dto';
import { UpdateUserBusinessesDto } from './dto/update-businesses-user.dto';
import { DeleteUserBusinessesDto } from './dto/delete-businesses-user.dto';
import { IResponseWrapper } from 'src/interface/base.response.interface';
import { UpdateUserProfileUserDto } from './dto/update-profile-user.dto';
import { AddUserBusinessesDto } from './dto/add-user-businesses.dto';
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
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup') // creating user
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<ICreateUser> {  // The createUserDto object is then passed as an argument to the createUserServiceHandler method of the usersService instance, which is responsible for creating a new user based on the information in the DTO

    try {

      const createdUser = await this.usersService.createUserServiceHandler(createUserDto);  // If the user is successfully created, the response is returned as a JSON object with a status code and the user information. If there is an error, the catch block is executed, and an error response is returned with an error message and a status code of 500 (Internal Server Error).
      res.status(Number(createdUser.statusCode)).json(createdUser)

    } catch (error) {

      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }


  @Post('login')  // user login controller
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto): Promise<ILoginUser> {

    try {

      const loginUser = await this.usersService.LoginUserServiceHandler(loginUserDto);
      res.status(Number(loginUser.statusCode)).json(loginUser)

    } catch (error) {

      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }


  @Post('resend_verfication_link') // if user doesn't get verfication code in email, he can send verfification link again
  async resendVerificationLink(@Res() res: Response, @Body() verificationLinkUserDto: ResendForgetPasswordLinkUserDto): Promise<IVerificationLinkUser> {

    try {

      const ResendVerificationLink = await this.usersService.VerificationLinkUserServiceHandler(verificationLinkUserDto);
      res.status(Number(ResendVerificationLink.statusCode)).json(ResendVerificationLink)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @Post('resend_forgetpassword_link') // if your forget his password, it can generate verfication code for this
  async resendForgetPasswordLink(@Res() res: Response, @Body() resendForgetPasswordLinkUserDto: ResendForgetPasswordLinkUserDto): Promise<IVerificationLinkUser> {

    try {

      const ResendForgetPasswordLink = await this.usersService.resendForgetPasswordLinkUserServiceHandler(resendForgetPasswordLinkUserDto);
      res.status(Number(ResendForgetPasswordLink.statusCode)).json(ResendForgetPasswordLink)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @Post('checking_forgetpassword_code') // checking forget password verfication code which was received from email whether it's valid or it's expire
  async checkingForgetpasswordCode(@Res() res: Response, @Body() forgetPasswordCodeUserDto: ForgetPasswordCodeUserDto): Promise<IForgetPasswordCodeUser> {

    try {

      const ForgetPasswordCode = await this.usersService.checkingForgetPasswordCodeUserServiceHandler(forgetPasswordCodeUserDto);
      res.status(Number(ForgetPasswordCode.statusCode)).json(ForgetPasswordCode)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @Post('checking_verification_code') // checking user verification code which was received from email when he signup 
  async checkingVerificationCode(@Res() res: Response, @Body() verificationCodeUserDto: VerificationCodeUserDto): Promise<IVerificationCodeUser> {

    try {

      const VerificationCode = await this.usersService.checkingVerificationCodeUserServiceHandler(verificationCodeUserDto);
      res.status(Number(VerificationCode.statusCode)).json(VerificationCode)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @Post('reset_user_password') // reseting it's password 
  async resetUserPassword(@Res() res: Response, @Body() resetPasswordUserDto: ResetPasswordUserDto): Promise<IResetPasswordUser> {

    try {

      const ResetPassword = await this.usersService.resetPasswordUserServiceHandler(resetPasswordUserDto);
      res.status(Number(ResetPassword.statusCode)).json(ResetPassword)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }


  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('changing_password') // chaning password with in the application
  async changingUserPassword(@Res() res: Response, @Body() changingPasswordUserDto: ChangingPasswordUserDto): Promise<IChangingPasswordUser> {

    try {

      const ChangingPassword = await this.usersService.changingPasswordUserServiceHandler(changingPasswordUserDto);
      res.status(Number(ChangingPassword.statusCode)).json(ChangingPassword)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }


  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update_user_profile')
  async updateUserProfile(@Res() res: Response, @Req() request: Request, @Body() updateUserProfileUserDto: UpdateUserProfileUserDto): Promise<IUpdateProfileUser> {

    try {

      const updateUserProfile = await this.usersService.updateProfileUserServiceHandler(updateUserProfileUserDto, request);
      res.status(Number(updateUserProfile.statusCode)).json(updateUserProfile)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add_user_businesses')
  async addUserBusinesses(@Res() res: Response, @Req() request: Request, @Body() addUserBusinessesDto: AddUserBusinessesDto): Promise<IAddBusinessUser> {

    try {

      const addUserBusiness = await this.usersService.addBusinessesUserServiceHandler(addUserBusinessesDto, request);
      res.status(Number(addUserBusiness.statusCode)).json(addUserBusiness)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update_user_businesses')
  async updateUserBusinesses(@Res() res: Response, @Req() request: Request, @Body() updateUserBusinessesDto: UpdateUserBusinessesDto): Promise<IUpdateBusinessUser> {

    try {

      const updateUserBusiness = await this.usersService.updateBusinessesUserServiceHandler(updateUserBusinessesDto, request);
      res.status(Number(updateUserBusiness.statusCode)).json(updateUserBusiness)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('delete_user_businesses')
  async deleteUserBusinesses(@Res() res: Response, @Req() request: Request, @Body() deleteUserBusinessesDto: DeleteUserBusinessesDto): Promise<IUpdateBusinessUser> {

    try {

      const deleteUserBusiness = await this.usersService.deleteBusinessesUserServiceHandler(deleteUserBusinessesDto, request);
      res.status(Number(deleteUserBusiness.statusCode)).json(deleteUserBusiness)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }


  // --------------------------------- GET ROUTES -----------------------------------

  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get_user_profile') // chaning password with in the application
  async getUserProfile(@Res() res: Response, @Req() request: Request): Promise<IGetProfileUser> {

    try {

      const getUserProfile = await this.usersService.getProfileUserServiceHandler(request);
      res.status(Number(getUserProfile.statusCode)).json(getUserProfile)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get_user_businesses') // chaning password with in the application
  async getUserBusinesses(@Res() res: Response, @Req() request: Request): Promise<IGetBusinessesUser> {

    try {

      const getUserBusinesses = await this.usersService.getUserBusinessesServiceHandler(request);
      res.status(Number(getUserBusinesses.statusCode)).json(getUserBusinesses)

    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }


}
