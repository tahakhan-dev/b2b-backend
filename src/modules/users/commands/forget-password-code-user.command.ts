import { ForgetPasswordCodeUserDto } from '../dto/checking-forgetpassword-code-user.dto';
import { ICommand } from '@nestjs/cqrs';


export class ForgetPasswordCodeUserCommand implements ICommand {
    constructor(
        public readonly forgetPasswordCodeUserDto: ForgetPasswordCodeUserDto,
    ) { }
}
