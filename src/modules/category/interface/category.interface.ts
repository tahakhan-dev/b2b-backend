import { Status } from "src/common/enums/status"
import { StatusCodes } from "src/common/enums/status-codes"

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