import { ChangingPasswordUserDto } from '../dto/changing-password-user.dto';
import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';
import { AddUserBusinessesDto } from '../dto/add-user-businesses.dto';


export class AddBusinessesUserCommand implements ICommand {
    constructor(
        public readonly addUserBusinessesDto: AddUserBusinessesDto,
        public readonly request: Request
    ) { }
}
