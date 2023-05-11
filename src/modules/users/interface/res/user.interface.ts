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

export interface IVerificationCodeUser {
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

export interface IChangingPasswordUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}

export interface IUpdateProfileUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}

export interface IGetProfileUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<UserEntity[]>
    Message?: string
}


export interface IBusinessUser {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<BusinessUserResult[]>
    Message?: string
}

export interface BusinessUserResult{
    id: number,
    userId:number,
    businessContactInfromation:string,
    businessDescription:string,
    businessLocations:string,
    headquarters:string,
    businessEmail:string,
    businessPhoneNumber:string,
    sysId:string
    isActive: boolean,
    isDeleted: boolean,
    serverCreatedOn: Date,
    serverUpdatedOn: Date
}