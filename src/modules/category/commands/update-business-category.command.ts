import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ICommand } from '@nestjs/cqrs';

export class UpdateBusinessCategoryCommand implements ICommand {
    constructor(
        public readonly updateCategoryDto: UpdateCategoryDto,
    ) { }
}
