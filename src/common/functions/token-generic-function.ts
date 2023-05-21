import { ExecutionContext, Injectable } from '@nestjs/common';
import { IDecryptWrapper } from 'src/interface/base.response.interface';
import { AuthService } from 'src/modules/auth/auth.service';
import { Request } from 'express';
@Injectable()
export class TokenFunctions {
    constructor(
        private authService: AuthService
    ) { }

    decryptUserToken(request: Request): IDecryptWrapper | any {
        const authorizationHeader: string = request.headers['authorization']
        if (authorizationHeader) {

            const consumerToken: string = authorizationHeader.replace('Bearer', '').trim()
            let decryptToken: IDecryptWrapper = this.authService.decodeJWT(consumerToken) as IDecryptWrapper
            return decryptToken
        }
        return true
    }

    getUserToken(request: Request): string | boolean {
        const authorizationHeader: string = request.headers['authorization']
        if (authorizationHeader) {

            const consumerToken: string = authorizationHeader.replace('Bearer', '').trim()
            return consumerToken
        }
        return true
    }
}
