import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import 'dotenv/config';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([UserEntity], process.env.CONNECTION_NAME_2)
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
