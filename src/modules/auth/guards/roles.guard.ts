import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { IDecryptWrapper } from "src/interface/base.response.interface";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserRole } from "src/common/enums/user-role";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { Repository } from "typeorm";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(UserEntity, process.env.CONNECTION_NAME_2)
        private readonly userRepositoryR: Repository<UserEntity>,
        private authService: AuthService

    ) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();

        const consumerToken: string = request.headers['authorization'].replace('Bearer', '').trim()

        let decryptToken: IDecryptWrapper = this.authService.decodeJWT(consumerToken) as IDecryptWrapper

        try {

            let UserResult: Partial<UserEntity> = await this.userRepositoryR.findOne({
                where: [
                    { userName: decryptToken.userName, role: decryptToken.role as UserRole },
                    { email: decryptToken.email, role: decryptToken.role as UserRole }]
            });

            if (UserResult) {
                const hasRole = () => roles.indexOf(UserResult.role) > -1;
                let hasPermission: boolean = false;
                if (hasRole()) {
                    hasPermission = true;
                };
                return UserResult && hasPermission;
            } else {
                return UserResult && false
            }

        } catch (error) {
            return false

        }

    }
}