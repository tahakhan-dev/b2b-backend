import { UserRole } from "src/common/enums/user-role";
import { StatusCodes } from "../common/enums/status-codes";

export interface IResponseWrapper<T> {
    StatusCode: StatusCodes;
    Result?: Partial<T>;
    Status: number,
    Message: string;
}

export interface IDecryptWrapper {
    userId: number,
    userName: string,
    email: string,
    isVerified: boolean,
    role: UserRole,
    iat: number,
    exp: number
}




