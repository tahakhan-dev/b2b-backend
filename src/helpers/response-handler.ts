import { IResponseWrapper } from "../../src/interface/base.response.interface";
import { StatusCodes } from "../../src/common/enums/status-codes";
import { Status } from "../../src/common/enums/status";

export function responseHandler<T>(Result: Partial<T>, Message: string, Status: Status, StatusCode: StatusCodes): IResponseWrapper<T> {

    return {
        StatusCode: StatusCode,
        Status,
        Result: Status == 1 ? Result : null,
        Message,
    };

}