import { UserRole } from "src/common/enums/user-role";

export interface IUserSearchOptionsByUserNameOrEmail {
    where: (
        | [{
            email?: string,
            userName?: string,
            role: UserRole,
            isActive: boolean
        }]
        | [
            {
                email?: string,
                userName?: string,
                role: UserRole,
                isActive: boolean
            },
            {
                email?: string,
                userName?: string,
                role: UserRole,
                isActive: boolean
            }
        ]
    );
}

export interface IUserCodeByUserId {
    where: { userId: number, verificationCode: number, isActive: boolean }
}

