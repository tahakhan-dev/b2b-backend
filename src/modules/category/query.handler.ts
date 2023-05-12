import { EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetBusinessTypeCategoryQuery } from "./query/get-business-type-category.query";
import { CategoryRepository } from "./category.repository";
import { IBusinessTypeCategory } from "./interface/category.interface";



@QueryHandler(GetBusinessTypeCategoryQuery)
export class GetBusinessTypeCategoryQueryHandler implements IQueryHandler<GetBusinessTypeCategoryQuery> {
    constructor(
        private readonly categoryRepo: CategoryRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(resolve: (value?) => void): Promise<IBusinessTypeCategory> {
        const getBusinessType = this.publisher.mergeObjectContext(
            await this.categoryRepo.businessTypeCategory(),
        );
        return getBusinessType;
    }
}