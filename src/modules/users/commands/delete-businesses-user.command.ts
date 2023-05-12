import { DeleteUserBusinessesDto } from '../dto/delete-businesses-user.dto';
import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';


export class DeleteBusinessesUserCommand implements ICommand {
    constructor(
        public readonly deleteUserBusinessesDto: DeleteUserBusinessesDto,
        public readonly request: Request
    ) { }
}
