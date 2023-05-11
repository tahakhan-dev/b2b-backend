import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessTypeCategoryEntity } from './entities/business-type-category.entity';
import { DecryptToken } from 'src/common/functions/decrypt-token';
import { AuthModule } from '../auth/auth.module';
import { GetBusinessTypeCategoryQueryHandler } from './query.handler';
import 'dotenv/config';
import { CategoryRepository } from './category.repository';
import { UserRepository } from '../users/users.repository';
import { UserEntity } from '../users/entities/user.entity';


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

    //-------------Query------------
    GetBusinessTypeCategoryQueryHandler
  ]
})
export class CategoryModule { }
