import { VerificationCodeUserDto } from '../dto/checking-verification-code-user.dto';
import { ICommand } from '@nestjs/cqrs';


export class VerificationCodeUserCommand implements ICommand {
    constructor(
        public readonly verificationCodeUserDto: VerificationCodeUserDto,
    ) { }
}
