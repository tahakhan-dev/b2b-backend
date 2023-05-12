import { AddUserBusinessesDto } from '../dto/add-user-businesses.dto';
import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';


export class AddBusinessesUserCommand implements ICommand {
    constructor(
        public readonly addUserBusinessesDto: AddUserBusinessesDto,
        public readonly request: Request
    ) { }
}
