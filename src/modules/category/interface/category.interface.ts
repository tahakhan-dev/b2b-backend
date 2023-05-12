import { BusinessTypeCategoryEntity } from "../entities/business-type-category.entity"
import { StatusCodes } from "src/common/enums/status-codes"
import { Status } from "src/common/enums/status"

export interface IBusinessTypeCategory {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<IBusinessTypeCategoryResult[]>
    Message?: string
}


export interface IBusinessTypeCategoryResult {
    id: number,
    name: string,
    isActive: boolean,
    isDeleted: boolean,
    serverCreatedOn: Date,
    serverUpdatedOn: Date
}

export interface ICreateCategory {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<BusinessTypeCategoryEntity[]>
    Message?: string
}

export interface IUpdateCategory {
    StatusCode?: StatusCodes,
    Status: Status
    Result?: Partial<BusinessTypeCategoryEntity[]>
    Message?: string
}