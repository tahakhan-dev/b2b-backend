import { CreateCategoryDto } from '../dto/create-category.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateBusinessCategoryCommand implements ICommand {s
    constructor(
        public readonly createCategoryDto: CreateCategoryDto,
    ) { }
}
