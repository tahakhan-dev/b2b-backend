import { IUserCodeByUserId, IUserSearchOptionsByUserNameOrEmail } from 'src/interface/conditions/users-condition.interface';
import { Injectable } from '@nestjs/common';
import { UserRole } from '../enums/user-role';

@Injectable()
export class UserConditions {

    usernameOrEmail(email?: string, userName?: string, role?: UserRole): IUserSearchOptionsByUserNameOrEmail { // username and email function condition asigning interface to it


        let condition: IUserSearchOptionsByUserNameOrEmail = email && userName ? { where: [{ email, role }, { userName, role }] } : email == undefined ? { where: [{ userName, role }] } : { where: [{ email, role }] }
        return condition
    }

    getUserCodeByUserId(userId: number, verificationCode: number): IUserCodeByUserId {
        return {
            where: {
                userId,
                verificationCode,
                isActive: true,
                isDeleted: false
            },
        }
    }

}
