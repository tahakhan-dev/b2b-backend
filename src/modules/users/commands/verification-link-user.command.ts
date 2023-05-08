import { VerificationLinkUserDto } from '../dto/verification-link-user.dto';
import { ICommand } from '@nestjs/cqrs';


export class VerificationLinkUserCommand implements ICommand {
    constructor(
        public readonly verificationLinkUserDto: VerificationLinkUserDto,
    ) { }
}
