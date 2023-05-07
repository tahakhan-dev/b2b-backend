import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable, from, of } from 'rxjs';
// import { userDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    // constructor(private readonly jwtService: JwtService) { }

    // generateJWT(user: userDto): Observable<string> {
    //     return from(this.jwtService.signAsync({ userName: user.userName, email: user.email }));
    // }

    // decodeJWT(authToken: string): Object {
    //     return this.jwtService.decode(authToken)
    // }


    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async comparePasswords(newPassword: string, passwortHash: string): Promise<boolean> {
        return bcrypt.compare(newPassword, passwortHash);
    }

}
