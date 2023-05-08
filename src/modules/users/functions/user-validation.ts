import { ICreateUser, IForgetPasswordCodeUser, ILoginUser, IResetPasswordUser, IVerificationCodeUser, IVerificationLinkUser } from '../interface/res/user.interface';
import { VerificationLinkUserDto } from '../dto/verification-link-user.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from 'src/common/enums/user-role';
import { UserSignUpType } from 'src/common/enums/signup-type';
import { responseHandler } from 'src/helpers/response-handler';
import { Status } from 'src/common/enums/status';
import { StatusCodes } from 'src/common/enums/status-codes';
import { ForgetPasswordCodeUserDto } from '../dto/checking-forgetpassword-code-user.dto';
import { ResetPasswordUserDto } from '../dto/reset-password-user.dto';
import { VerificationCodeUserDto } from '../dto/checking-verification-code-user.dto';
import { ChangingPasswordUserDto } from '../dto/changing-password-user.dto';
@Injectable()
export class UserValidation {

    verficationLinkValidation(verificationLinkUserDto: Partial<UserEntity> | VerificationLinkUserDto | CreateUserDto, getUser?: Partial<UserEntity>, exists?: boolean): IVerificationLinkUser | ILoginUser | ICreateUser {

        if (!verificationLinkUserDto)
            return responseHandler(null, "NO Email Exist", Status.FAILED, StatusCodes.NOT_FOUND);
        if (verificationLinkUserDto && verificationLinkUserDto?.role as UserRole == UserRole.ADMIN)
            return responseHandler(null, "Verfication Link can't be sent to admin", Status.FAILED, StatusCodes.FORBIDDEN)
        if (verificationLinkUserDto && verificationLinkUserDto?.signUpType as UserSignUpType != UserSignUpType.CUSTOM)
            return responseHandler(null, "Verfication Link can't be sent to socail Sign UP user", Status.FAILED, StatusCodes.FORBIDDEN);

        if (getUser && getUser?.emailVerified == true && exists == true) return responseHandler(null, "You Email is already verified ", Status.SUCCESS, StatusCodes.SUCCESS)

    }

    userExistsValidation(createUserDto: CreateUserDto, getUser: Partial<UserEntity>): ICreateUser {
        if (createUserDto?.userName === getUser?.userName)
            return responseHandler(null, "This UserName Already Exists", Status.FAILED, StatusCodes.CONFLICT);

        if (createUserDto?.email === getUser?.email)
            return responseHandler(null, "This Email Already Exists", Status.FAILED, StatusCodes.CONFLICT);

        if (getUser) return responseHandler(null, "This User Already Exists", Status.FAILED, StatusCodes.CONFLICT);
        if (createUserDto?.role as UserRole == UserRole.ADMIN && createUserDto?.signUpType as UserSignUpType == UserSignUpType.SOCIAL) return responseHandler(null, "You can't sign up with social login", Status.FAILED, StatusCodes.FORBIDDEN);

    }

    userForgetPasswordCodeValidation(forgetPasswordCodeUserDto?: ForgetPasswordCodeUserDto, getUser?: Partial<UserEntity>, exists?: boolean): IForgetPasswordCodeUser {

        if (forgetPasswordCodeUserDto && forgetPasswordCodeUserDto?.role as UserRole == UserRole.ADMIN)
            return responseHandler(null, "admin can't process this code", Status.FAILED, StatusCodes.FORBIDDEN)

        if (forgetPasswordCodeUserDto && forgetPasswordCodeUserDto?.signUpType as UserSignUpType != UserSignUpType.CUSTOM)
            return responseHandler(null, "social user can't process this code", Status.FAILED, StatusCodes.FORBIDDEN);

        if (!getUser && exists == true) return responseHandler(null, "No User Exist ", Status.SUCCESS, StatusCodes.NOT_FOUND)

        if (getUser && getUser?.emailVerified === true) return responseHandler(null, "You Email is already verified ", Status.SUCCESS, StatusCodes.SUCCESS)



    }

    userVerificationCodeValidation(verificationCodeUserDto?: VerificationCodeUserDto, getUser?: Partial<UserEntity>, exists?: boolean): IVerificationCodeUser {

        if (verificationCodeUserDto && verificationCodeUserDto?.role as UserRole == UserRole.ADMIN)
            return responseHandler(null, "admin can't process this code", Status.FAILED, StatusCodes.FORBIDDEN)

        if (verificationCodeUserDto && verificationCodeUserDto?.signUpType as UserSignUpType != UserSignUpType.CUSTOM)
            return responseHandler(null, "social user can't process this code", Status.FAILED, StatusCodes.FORBIDDEN);

        if (!getUser && exists == true) return responseHandler(null, "No User Exist ", Status.SUCCESS, StatusCodes.NOT_FOUND)

        if (getUser && getUser?.emailVerified === true) return responseHandler(null, "You Email is already verified ", Status.SUCCESS, StatusCodes.SUCCESS)



    }

    userResetPasswordValidation(resetPasswordUserDto?: ResetPasswordUserDto | ChangingPasswordUserDto, getUser?: Partial<UserEntity>, exists?: boolean): IResetPasswordUser {

        if (resetPasswordUserDto && resetPasswordUserDto?.role as UserRole == UserRole.ADMIN)
            return responseHandler(null, "admin can't change their password", Status.FAILED, StatusCodes.FORBIDDEN)

        if (resetPasswordUserDto && resetPasswordUserDto?.signUpType as UserSignUpType != UserSignUpType.CUSTOM)
            return responseHandler(null, "social user can't change their password", Status.FAILED, StatusCodes.FORBIDDEN);

        if (!getUser && exists == true) return responseHandler(null, "you can't change your password because this user doesn't exists ", Status.SUCCESS, StatusCodes.NOT_FOUND)

        if (getUser && getUser.emailVerified == false && exists == true) return responseHandler(null, "your password can't be change because your email is not verified", Status.SUCCESS, StatusCodes.FORBIDDEN)

        // if (getUser && getUser?.emailVerified === true) return responseHandler(null, "You Email is already verified ", Status.SUCCESS, StatusCodes.SUCCESS)



    }
}
