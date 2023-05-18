import { UpdateUserBusinessesDto } from '../dto/update-businesses-user.dto';
import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';


export class UpdateBusinessesUserCommand implements ICommand {
    constructor(
        public readonly updateUserBusinessesDto: UpdateUserBusinessesDto,
        public readonly request: Request
    ) { }
}
