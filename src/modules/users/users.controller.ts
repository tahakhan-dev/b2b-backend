import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ICreateUser, ILoginUser } from './interface/res/user.interface';
import { IResponseWrapper } from 'src/interface/base.response.interface';
import { StatusCodes } from 'src/common/enums/status-codes';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Status } from 'src/common/enums/status';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<ICreateUser> {

    try {
      const createdUser = await this.usersService.createUserServiceHandler(createUserDto);
      
      res.status(Number(createdUser.StatusCode)).json(createdUser)
    } catch (error) {

      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }


  @Post('login')
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto): Promise<ILoginUser> {

    try {
      const loginUser = await this.usersService.LoginUserServiceHandler(loginUserDto);
      res.status(Number(loginUser.StatusCode)).json(loginUser)
    } catch (error) {

      const response: IResponseWrapper<[]> = {
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        Status: Status.FAILED,
        Result: null,
        Message: 'There is some error',
      };
      return response;
    }
  }

  @Get()
  async findAll() {
    let ab = await this.usersService.findAll();
    console.log(ab, '========ab==========');

    return ab
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
