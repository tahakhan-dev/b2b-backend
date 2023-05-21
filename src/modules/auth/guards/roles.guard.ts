import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { IDecryptWrapper } from "src/interface/base.response.interface";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { RedisService } from "src/modules/redis/redis.service";
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
        @Inject(RedisService) private readonly redisService: RedisService,
        private authService: AuthService,

    ) { }

    async canActivate(context: ExecutionContext) {
        let decryptToken: IDecryptWrapper, consumerToken: string, UserResult: Partial<UserEntity>, hasPermission: boolean, resdisResponse: Partial<UserEntity>;

        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        consumerToken = request.headers['authorization'].replace('Bearer', '').trim()
        decryptToken = this.authService.decodeJWT(consumerToken) as IDecryptWrapper

        try {
            resdisResponse = await this.redisService.getUserProfileFromRedis(decryptToken.userId);

            if (resdisResponse) {
                UserResult = resdisResponse
            } else {
                UserResult = await this.userRepositoryR.findOne({
                    where: [
                        { userName: decryptToken.userName, role: decryptToken.role as UserRole },
                        { email: decryptToken.email, role: decryptToken.role as UserRole }]
                });
                UserResult.token = consumerToken
                this.redisService.addUserProfileValueToRedis(UserResult.id, UserResult)
            }

            if (UserResult) {
                const hasRole = () => roles.indexOf(UserResult.role) > -1;
                hasPermission = false;

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