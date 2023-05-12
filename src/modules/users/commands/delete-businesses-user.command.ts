import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';
import { DeleteUserBusinessesDto } from '../dto/delete-businesses-user.dto';


export class DeleteBusinessesUserCommand implements ICommand {
    constructor(
        public readonly deleteUserBusinessesDto: DeleteUserBusinessesDto,
        public readonly request: Request
    ) { }
}
