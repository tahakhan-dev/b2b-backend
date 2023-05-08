import { ChangingPasswordUserDto } from '../dto/changing-password-user.dto';
import { ICommand } from '@nestjs/cqrs';


export class ChangingPasswordUserCommand implements ICommand {
    constructor(
        public readonly changingPasswordUserDto: ChangingPasswordUserDto,
    ) { }
}
