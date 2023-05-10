import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IBusinessTypeCategory } from './interface/category.interface';
import { GetBusinessTypeCategoryQuery } from './query/get-business-type-category.query';

@Injectable()
export class CategoryService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,     // commandBus and queryBus, both of which are instances of the CommandBus and QueryBus classes respectively. These classes are likely dependencies of the class or module where this constructor is defined
  ) { }

  async getBusinessTypeServiceHandler(): Promise<IBusinessTypeCategory> {
    return await this.queryBus.execute(
      new GetBusinessTypeCategoryQuery()
    )
  }

}
