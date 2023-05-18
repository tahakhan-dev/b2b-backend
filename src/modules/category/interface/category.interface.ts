import { BusinessTypeCategoryEntity } from "../entities/business-type-category.entity"
import { StatusCodes } from "src/common/enums/status-codes"
import { Status } from "src/common/enums/status"

export interface IBusinessTypeCategory {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<IBusinessTypeCategoryResult[]>
    message?: string
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
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<BusinessTypeCategoryEntity[]>
    message?: string
}

export interface IUpdateCategory {
    statusCode?: StatusCodes,
    status: Status
    result?: Partial<BusinessTypeCategoryEntity[]>
    message?: string
}