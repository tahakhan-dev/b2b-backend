import { IBusinessTypeCategory, ICreateCategory, IUpdateCategory } from './interface/category.interface';
import { CreateBusinessCategoryCommand } from './commands/create-business-category.command';
import { UpdateBusinessCategoryCommand } from './commands/update-business-category.command';
import { GetBusinessTypeCategoryQuery } from './query/get-business-type-category.query';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

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


  // --------------- post ========================]

  async createBussinessServiceHandler(createCategoryDto: CreateCategoryDto): Promise<ICreateCategory> {
    return await this.commandBus.execute(
      new CreateBusinessCategoryCommand(createCategoryDto)
    )
  }

  async updateBussinessServiceHandler(updateCategoryDto: UpdateCategoryDto): Promise<IUpdateCategory> {
    return await this.commandBus.execute(
      new UpdateBusinessCategoryCommand(updateCategoryDto)
    )
  }

}
