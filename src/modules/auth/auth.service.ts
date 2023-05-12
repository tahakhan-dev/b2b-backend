import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from 'src/common/enums/user-role';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    async generateJWT(user: UserEntity): Promise<string> {

        return this.jwtService.signAsync({
            userId: user.id,
            userName: user.userName,
            email: user.email,
            isVerified: user.emailVerified,
            role: user.role as UserRole
        });
    }

    decodeJWT(authToken: string): Object {
        return this.jwtService.decode(authToken)
    }


    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async comparePasswords(newPassword: string, passwortHash: string): Promise<boolean> {
        return bcrypt.compare(newPassword, passwortHash);
    }

}
