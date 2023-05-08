import { StatusCodes } from "src/common/enums/status-codes"
import { UserEntity } from "../../entities/user.entity"
import { Status } from "src/common/enums/status"

export interface ICreateUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}

export interface ILoginUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}

export interface IVerificationLinkUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}

export interface IForgetPasswordCodeUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}

export interface IResetPasswordUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}