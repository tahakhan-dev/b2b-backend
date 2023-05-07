import { StatusCodes } from "../common/enums/status-codes";

export interface IResponseWrapper<T> {
    StatusCode: StatusCodes;
    Result?: Partial<T>;
    Status: number,
    Message: string;
}


