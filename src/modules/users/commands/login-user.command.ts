import { LoginUserDto } from '../dto/login-user.dto';
import { ICommand } from '@nestjs/cqrs';


export class LoginUserCommand implements ICommand {
    constructor(
        public readonly LoginUserDto: LoginUserDto,
    ) { }
}
