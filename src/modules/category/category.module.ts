import { CreateBusinessCategoryCommandHandler, UpdateBusinessCategoryCommandHandler } from './commands.handler';
import { BusinessTypeCategoryEntity } from './entities/business-type-category.entity';
import { GetBusinessTypeCategoryQueryHandler } from './query.handler';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { UserEntity } from '../users/entities/user.entity';
import { CategoryService } from './category.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import 'dotenv/config';


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([BusinessTypeCategoryEntity]),
    TypeOrmModule.forFeature([BusinessTypeCategoryEntity, UserEntity], process.env.CONNECTION_NAME_2),
    AuthModule,
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    // UserRepository,
    // DecryptToken,

    CreateBusinessCategoryCommandHandler,
    UpdateBusinessCategoryCommandHandler,

    //-------------Query------------
    GetBusinessTypeCategoryQueryHandler
  ]
})
export class CategoryModule { }
