
import { UserVerificationCodeEntity } from "../entities/user-verfication-code.entity";
import { UserSignUpType } from "src/common/enums/signup-type";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserRole } from "src/common/enums/user-role";
import { UserEntity } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { IDecryptWrapper } from "src/interface/base.response.interface";
import { UserBusinessesDto } from "../dto/user-businesses.dto";
import { UserBusinessesEntity } from "../entities/user-businesses.entity";
import * as moment from 'moment';


@Injectable()
export class UserMapper {

    createuserObj(data: CreateUserDto): UserEntity {
        const userObj = new UserEntity();
        userObj.userName = data.userName;
        userObj.firstName = data.firstName;
        userObj.lastName = data.lastName;
        userObj.email = data.email;
        userObj.password = data.password;
        userObj.role = data.role as UserRole;
        userObj.signUpType = data.signUpType as UserSignUpType;
        userObj.phoneNumber = data.phoneNumber;
        userObj.profileImage = data.profileImage;
        userObj.emailVerified = data && data.signUpType as UserSignUpType == UserSignUpType.CUSTOM &&
            data.role as UserRole != UserRole.ADMIN ? false : true

        return userObj

    }

    createVerificationObj(userId: number, verificationCode: number): UserVerificationCodeEntity {
        const utcDate = moment.utc();
        const formattedDate = utcDate.format('YYYY-MM-DD HH:mm:ss');

        const verifObj = new UserVerificationCodeEntity();
        verifObj.userId = userId
        verifObj.verificationCode = verificationCode,
            verifObj.tokenCreationDate = formattedDate

        return verifObj
    }

    createUserBusinessObj(decryptResponse: IDecryptWrapper, userBusinessesDto: UserBusinessesDto): UserBusinessesEntity {
        const userBusinessObj = new UserBusinessesEntity();
        userBusinessObj.userId = decryptResponse?.userId;
        userBusinessObj.businessTypeId = userBusinessesDto?.businessTypeId;
        userBusinessObj.businessContactInfromation = userBusinessesDto?.businessContactInfromation ?? null;
        userBusinessObj.businessLocations = userBusinessesDto?.businessLocations ?? null
        userBusinessObj.businessPhoneNumber = userBusinessesDto?.businessPhoneNumber ?? null
        userBusinessObj.businessDescription = userBusinessesDto?.businessDescription ?? null;
        userBusinessObj.headquarters = userBusinessesDto?.headquarters ?? null;
        userBusinessObj.sysId = userBusinessesDto?.sysId ?? null;
        userBusinessObj.businessEmail = userBusinessesDto?.businessEmail ?? null;
        userBusinessObj.businessName = userBusinessesDto?.businessName ?? null
        userBusinessObj.isActive = true
        userBusinessObj.isDeleted = false

        return userBusinessObj
    }
}