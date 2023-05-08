import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { UserRepository } from "src/modules/users/users.repository";
import { IDecryptWrapper } from "src/interface/base.response.interface";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => UserRepository))
        private UserRepository: UserRepository,
        private authService: AuthService

    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();

        const consumerToken: string = request.headers['authorization'].replace('Bearer', '').trim()

        let decryptToken: IDecryptWrapper = this.authService.decodeJWT(consumerToken) as IDecryptWrapper


        return this.UserRepository.findOne(decryptToken.userName, decryptToken.email, decryptToken.role).pipe(
            map((user: UserEntity) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;
                if (hasRole()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            })
        )
    }
}