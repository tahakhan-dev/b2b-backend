import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { hasRoles } from '../auth/guards/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { UserRole } from 'src/common/enums/user-role';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IBusinessTypeCategory, ICreateCategory, IUpdateCategory } from './interface/category.interface';
import { Response, Request } from 'express';
import { IResponseWrapper } from 'src/interface/base.response.interface';
import { StatusCodes } from 'src/common/enums/status-codes';
import { Status } from 'src/common/enums/status';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @hasRoles(UserRole.BUYER, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('get_business_type') // chaning password with in the application
  async getBusinessType(@Res() res: Response): Promise<IBusinessTypeCategory> {

    try {
      const getBusinessType = await this.categoryService.getBusinessTypeServiceHandler();
      res.status(Number(getBusinessType.statusCode)).json(getBusinessType)
    } catch (error) {
      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  // ----------------------- Post Request ---------------------------------------------


  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add_business_category')
  async addBusinessCategory(@Res() res: Response, @Body() createCategoryDto: CreateCategoryDto): Promise<ICreateCategory> {

    try {

      const createdBusinessCategory = await this.categoryService.createBussinessServiceHandler(createCategoryDto);
      res.status(Number(createdBusinessCategory.statusCode)).json(createdBusinessCategory)

    } catch (error) {

      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update_business_category')
  async updateBusinessCategory(@Res() res: Response, @Body() updateCategoryDto: UpdateCategoryDto): Promise<IUpdateCategory> {

    try {

      const updateBusinessCategory = await this.categoryService.updateBussinessServiceHandler(updateCategoryDto);
      res.status(Number(updateBusinessCategory.statusCode)).json(updateBusinessCategory)

    } catch (error) {

      const response: IResponseWrapper<[]> = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: Status.FAILED,
        result: null,
        message: 'There is some error',
      };
      return response;
    }
  }

}
