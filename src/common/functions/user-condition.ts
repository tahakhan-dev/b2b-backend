import { Injectable } from '@nestjs/common';
import { IUserSearchOptionsByUserNameOrEmail } from 'src/interface/conditions/users-condition.interface';

@Injectable()
export class UserConditions {

    usernameOrEmail(username: string, email: string): IUserSearchOptionsByUserNameOrEmail {
        return {
            where: [
                {
                    email: email
                }, {
                    userName: username
                }
            ]
        }

    }
}
