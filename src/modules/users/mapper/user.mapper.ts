
import { UserVerificationCodeEntity } from "../entities/user-verfication-code.entity";
import { UserSignUpType } from "src/common/enums/signup-type";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserRole } from "src/common/enums/user-role";
import { UserEntity } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { IDecryptWrapper } from "src/interface/base.response.interface";
import { AddUserBusinessesDto } from "../dto/add-user-businesses.dto";
import { UserBusinessesEntity } from "../entities/user-businesses.entity";
import * as moment from 'moment';
import { UpdateUserBusinessesDto } from "../dto/update-businesses-user.dto";


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

    createUserBusinessObj(decryptResponse: IDecryptWrapper, addUserBusinessesDto: AddUserBusinessesDto): UserBusinessesEntity {
        const addUserBusinessObj = new UserBusinessesEntity();
        addUserBusinessObj.userId = decryptResponse?.userId;
        addUserBusinessObj.businessTypeId = addUserBusinessesDto?.businessTypeId;
        addUserBusinessObj.businessContactInfromation = addUserBusinessesDto?.businessContactInfromation ?? null;
        addUserBusinessObj.businessLocations = addUserBusinessesDto?.businessLocations ?? null
        addUserBusinessObj.businessPhoneNumber = addUserBusinessesDto?.businessPhoneNumber ?? null
        addUserBusinessObj.businessDescription = addUserBusinessesDto?.businessDescription ?? null;
        addUserBusinessObj.headquarters = addUserBusinessesDto?.headquarters ?? null;
        addUserBusinessObj.businessEmail = addUserBusinessesDto?.businessEmail ?? null;
        addUserBusinessObj.businessName = addUserBusinessesDto?.businessName ?? null
        addUserBusinessObj.isActive = true
        addUserBusinessObj.isDeleted = false
        addUserBusinessObj.sysId = addUserBusinessesDto?.sysId ?? false

        return addUserBusinessObj
    }

    UpdateUserBusinessObj(updateUserBusinessesDto: UpdateUserBusinessesDto): UserBusinessesEntity {
        const updateUserBusinessObj = new UserBusinessesEntity();
        updateUserBusinessObj.businessTypeId = updateUserBusinessesDto?.businessTypeId;
        updateUserBusinessObj.businessName = updateUserBusinessesDto?.businessName ?? null
        updateUserBusinessObj.businessContactInfromation = updateUserBusinessesDto?.businessContactInfromation ?? null;
        updateUserBusinessObj.businessDescription = updateUserBusinessesDto?.businessDescription ?? null;
        updateUserBusinessObj.businessLocations = updateUserBusinessesDto?.businessLocations ?? null
        updateUserBusinessObj.headquarters = updateUserBusinessesDto?.headquarters ?? null;
        updateUserBusinessObj.businessEmail = updateUserBusinessesDto?.businessEmail ?? null;
        updateUserBusinessObj.businessPhoneNumber = updateUserBusinessesDto?.businessPhoneNumber ?? null
        updateUserBusinessObj.sysId = updateUserBusinessesDto?.sysId ?? false

        return updateUserBusinessObj
    }
}