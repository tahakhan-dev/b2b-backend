import { ChangingPasswordUserDto } from '../dto/changing-password-user.dto';
import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';
import { UserBusinessesDto } from '../dto/user-businesses.dto';


export class BusinessesUserCommand implements ICommand {
    constructor(
        public readonly userBusinessesDto: UserBusinessesDto,
        public readonly request: Request
    ) { }
}
