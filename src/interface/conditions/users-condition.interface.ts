import { UserRole } from "src/common/enums/user-role";

export interface IUserSearchOptionsByUserNameOrEmail {
    where: (
        | [{
            email?: string;
            userName?: string;
            role: UserRole
        }]
        | [
            {
                email?: string;
                userName?: string;
                role: UserRole
            },
            {
                email?: string;
                userName?: string;
                role: UserRole
            }
        ]
    );
}

export interface IUserCodeByUserId {
    where: { userId: number, verificationCode: number, isActive: boolean, isDeleted: boolean }
}

