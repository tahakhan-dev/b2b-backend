import { LoginUserDto } from '../dto/login-user.dto';
import { ICommand } from '@nestjs/cqrs';
import { VerificationLinkUserDto } from '../dto/verification-link-user.dto';


export class VerificationLinkUserCommand implements ICommand {
    constructor(
        public readonly verificationLinkUserDto: VerificationLinkUserDto,
    ) { }
}
