import { UpdateBusinessCategoryCommand } from "./commands/update-business-category.command";
import { CreateBusinessCategoryCommand } from "./commands/create-business-category.command";
import { ICreateCategory, IUpdateCategory } from "./interface/category.interface";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CategoryRepository } from "./category.repository";

@CommandHandler(CreateBusinessCategoryCommand)
export class CreateBusinessCategoryCommandHandler implements ICommandHandler<CreateBusinessCategoryCommand> {
    constructor(
        private readonly categoryRepo: CategoryRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: CreateBusinessCategoryCommand, resolve: (value?) => void): Promise<ICreateCategory> {
        const createBusinessCategory = this.publisher.mergeObjectContext(
            await this.categoryRepo.createBusinessTypeCategory(command.createCategoryDto),
        );
        return createBusinessCategory;
    }
}

@CommandHandler(UpdateBusinessCategoryCommand)
export class UpdateBusinessCategoryCommandHandler implements ICommandHandler<UpdateBusinessCategoryCommand> {
    constructor(
        private readonly categoryRepo: CategoryRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: UpdateBusinessCategoryCommand, resolve: (value?) => void): Promise<IUpdateCategory> {
        const updateBusinessCategory = this.publisher.mergeObjectContext(
            await this.categoryRepo.updateBusinessTypeCategory(command.updateCategoryDto),
        );
        return updateBusinessCategory;
    }
}