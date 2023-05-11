import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';
import { UpdateUserBusinessesDto } from '../dto/update-businesses-user.dto';


export class UpdateBusinessesUserCommand implements ICommand {
    constructor(
        public readonly updateUserBusinessesDto: UpdateUserBusinessesDto,
        public readonly request: Request
    ) { }
}
