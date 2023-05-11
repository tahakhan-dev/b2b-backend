import { CreateUserDto } from '../dto/create-user.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand { // By defining a separate CreateUserCommand class, we can separate the logic for creating a new user from the rest of the application's business logic. This approach follows the CQRS pattern, which separates commands (operations that modify data) from queries (operations that fetch data).
    constructor(                                    // ICommand interface, the CreateUserCommand class must have a constructor property, which is satisfied by the existing constructor. The interface likely defines other properties or methods that are required for a class to be considered a valid command.
        public readonly createUsertDto: CreateUserDto,
    ) { }
}
