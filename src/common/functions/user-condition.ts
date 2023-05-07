import { Injectable } from '@nestjs/common';
import { IUserSearchOptionsByUserNameOrEmail } from 'src/interface/conditions/users-condition.interface';

@Injectable()
export class UserConditions {

    usernameOrEmail(email?: string, userName?: string): IUserSearchOptionsByUserNameOrEmail {

        let condition: IUserSearchOptionsByUserNameOrEmail = email && userName ? { where: [{ email }, { userName }] } : email == undefined ? { where: [{ userName }] } : { where: [{ email }] }
        return condition
    }
}
