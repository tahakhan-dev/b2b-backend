import { UpdateUserProfileUserDto } from '../dto/update-profile-user.dto';
import { ICommand } from '@nestjs/cqrs';
import { Request } from 'express';


export class UpdateProfileUserCommand implements ICommand {
    constructor(
        public readonly updateUserProfileUserDto: UpdateUserProfileUserDto,
        public readonly request: Request
    ) { }
}
