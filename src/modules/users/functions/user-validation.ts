import { Injectable } from '@nestjs/common';
import { IUserSearchOptionsByUserNameOrEmail } from 'src/interface/conditions/users-condition.interface';
import { UserEntity } from '../entities/user.entity';
import { VerificationLinkUserDto } from '../dto/verification-link-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRole } from 'src/common/enums/user-role';
import { UserSignUpType } from 'src/common/enums/signup-type';
import { responseHandler } from 'src/helpers/response-handler';
import { Status } from 'src/common/enums/status';
import { StatusCodes } from 'src/common/enums/status-codes';
import { ICreateUser, ILoginUser, IVerificationLinkUser } from '../interface/res/user.interface';

@Injectable()
export class UserValidation {

    verficationLinkValidation(verificationLinkUserDto: Partial<UserEntity> | VerificationLinkUserDto | CreateUserDto): IVerificationLinkUser | ILoginUser | ICreateUser {

        if (!verificationLinkUserDto)
            return responseHandler(null, "NO Email Exist", Status.FAILED, StatusCodes.NOT_FOUND);
        if (verificationLinkUserDto && verificationLinkUserDto.role as UserRole == UserRole.ADMIN)
            return responseHandler(null, "Verfication Link can't be sent to admin", Status.FAILED, StatusCodes.FORBIDDEN)
        if (verificationLinkUserDto && verificationLinkUserDto.signUpType as UserSignUpType != UserSignUpType.CUSTOM)
            return responseHandler(null, "Verfication Link can't be sent to socail Sign UP user", Status.FAILED, StatusCodes.FORBIDDEN);

    }
}
