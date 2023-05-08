import { ResendForgetPasswordLinkUserDto } from '../dto/forget-password-link-user.dto';
import { ICommand } from '@nestjs/cqrs';


export class ResendForgetPasswordLinkCommand implements ICommand {
    constructor(
        public readonly resendForgetPasswordLinkUserDto: ResendForgetPasswordLinkUserDto,
    ) { }
}
