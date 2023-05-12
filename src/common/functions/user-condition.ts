import { IDeleteConditon, IUpdateByIdAndUserId, IUpdateByUserIdAndIsActive, IUserCodeByUserId, IUserSearchOptionsByUserNameOrEmail } from 'src/interface/conditions/users-condition.interface';
import { Injectable } from '@nestjs/common';
import { UserRole } from '../enums/user-role';

@Injectable()
export class UserConditions {

    usernameOrEmail(email?: string, userName?: string, role?: UserRole): IUserSearchOptionsByUserNameOrEmail { // username and email function condition asigning interface to it

        let condition: IUserSearchOptionsByUserNameOrEmail = email && userName ? {
            where: [{ email, role, isActive: true },
            { userName, role, isActive: true }]
        } : email == undefined || email.length == 0 ?
            { where: [{ userName, role, isActive: true }] } : { where: [{ email, role, isActive: true }] }
        return condition
    }

    getUserCodeByUserId(userId: number, verificationCode: number): IUserCodeByUserId {
        return {
            where: {
                userId,
                verificationCode,
                isActive: true
            },
        }
    }

    updateByIdAndUserId(id: number, userId: number): IUpdateByIdAndUserId {
        return { id, userId }
    }

    deleteCondition(): IDeleteConditon {
        return { isActive: false, isDeleted: true }
    }

    updateByUserIdAndIsActive(userId: number, isActive): IUpdateByUserIdAndIsActive {
        return { userId, isActive }
    }



}
