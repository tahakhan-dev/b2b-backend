import { CreateUserDto } from '../dto/create-user.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly createUsertDto: CreateUserDto,
    ) { }
}
