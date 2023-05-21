import { IResponseWrapper } from "../../src/interface/base.response.interface";
import { StatusCodes } from "../../src/common/enums/status-codes";
import { Status } from "../../src/common/enums/status";

export function responseHandler<T>(result: Partial<T> | null, message: string, status: Status, statusCode: StatusCodes): IResponseWrapper<T> {

    const response: IResponseWrapper<T> = {
        statusCode,
        status,
        message,
    };

    if (result !== null) {
        response.result = result;
    }

    return response;

}