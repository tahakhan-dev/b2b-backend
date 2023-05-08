import { ResetPasswordUserDto } from '../dto/reset-password-user.dto';
import { ICommand } from '@nestjs/cqrs';


export class ResetPasswordUserCommand implements ICommand {
    constructor(
        public readonly resetPasswordUserDto: ResetPasswordUserDto,
    ) { }
}
