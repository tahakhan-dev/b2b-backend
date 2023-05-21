import { BusinessTypeCategoryEntity } from "src/modules/category/entities/business-type-category.entity"
import { StatusCodes } from "src/common/enums/status-codes"
import { UserEntity } from "../../entities/user.entity"
import { Status } from "src/common/enums/status"

export interface ICreateUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface ILoginUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IVerificationLinkUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IForgetPasswordCodeUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IVerificationCodeUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IResetPasswordUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IChangingPasswordUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IUpdateProfileUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IGetProfileUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UserEntity[]>
    message?: string
}

export interface IGetBusinessesUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<GetBusinessUserResult[]>
    message?: string
}


export interface IAddBusinessUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<AddBusinessUserResult[]>
    message?: string
}

export interface IUpdateBusinessUser {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<UpdateBusinessUserResult[]>
    message?: string
}

export interface IDeleteBusinessUser {
    statusCode?: StatusCodes,
    status: Status
    result?: any
    message?: string
}

export interface AddBusinessUserResult {
    id: number,
    userId: number,
    businessContactInfromation: string,
    businessDescription: string,
    businessLocations: string,
    businessName: string,
    headquarters: string,
    businessEmail: string,
    businessPhoneNumber: string,
    sysId: string
    isActive: boolean,
    isDeleted: boolean,
    serverCreatedOn: Date,
    serverUpdatedOn: Date
}

export interface GetBusinessUserResult {
    id: number,
    userId: number,
    businessName: string;
    businessContactInfromation: string,
    businessDescription: string,
    businessLocations: string,
    businessType: BusinessTypeCategoryEntity
    headquarters: string,
    businessEmail: string,
    businessPhoneNumber: string,
    isActive: boolean,
    isDeleted: boolean,
    serverCreatedOn: Date,
    serverUpdatedOn: Date
}

export interface UpdateBusinessUserResult {
    id: number,
    userId: number,
    businessContactInfromation: string,
    businessDescription: string,
    businessLocations: string,
    headquarters: string,
    businessEmail: string,
    businessPhoneNumber: string,
    sysId: string
    isActive: boolean,
    isDeleted: boolean,
    serverCreatedOn: Date,
    serverUpdatedOn: Date
}
