import { IBusinessTypeCategoryResult, IBusinessTypeCategory, ICreateCategory, IUpdateCategory } from "./interface/category.interface";
import { BusinessTypeCategoryEntity } from "./entities/business-type-category.entity";
import { responseHandler } from "src/helpers/response-handler";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { StatusCodes } from "src/common/enums/status-codes";
import { RedisService } from "../redis/redis.service";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Status } from "src/common/enums/status";
import { Repository } from "typeorm";
import 'dotenv/config';


@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(BusinessTypeCategoryEntity)
        private readonly BusinessTypeCategoryRepositoryw: Repository<BusinessTypeCategoryEntity>,
        @InjectRepository(BusinessTypeCategoryEntity, process.env.CONNECTION_NAME_2)
        private readonly BusinessTypeCategoryRepositoryR: Repository<BusinessTypeCategoryEntity>,
        @Inject(RedisService) private readonly redisService: RedisService,

    ) { }

    async businessTypeCategory(): Promise<any> {
        return await this.getBusinessTypeCategory()
    }

    async createBusinessTypeCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
        return await this.addBusinessTypeCategory(createCategoryDto)
    }

    async updateBusinessTypeCategory(updateCategoryDto: UpdateCategoryDto): Promise<any> {
        return await this.UpdateCategoryBusinessType(updateCategoryDto)
    }


    private async getBusinessTypeCategory(): Promise<IBusinessTypeCategory> {
        let response: IBusinessTypeCategory, result: Partial<IBusinessTypeCategoryResult[]>;

        try {
            let redisCategoryResponse = await this.redisService.getBusinessCategoryFromRedis(1)
            result = redisCategoryResponse ? [redisCategoryResponse] : await this.BusinessTypeCategoryRepositoryR.find()

            if (!redisCategoryResponse) await this.redisService.addBusinessCategoryValueToRedis(1, result)

            response = responseHandler(result, "Business Type Category", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    // -------------------------- post ----------------------------------
    private async addBusinessTypeCategory(createCategoryDto: CreateCategoryDto): Promise<ICreateCategory> {
        let response: ICreateCategory;

        try {

            this.BusinessTypeCategoryRepositoryw.save({ name: createCategoryDto.name })
            response = responseHandler(null, "Business Type Category Added", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    private async UpdateCategoryBusinessType(updateCategoryDto: UpdateCategoryDto): Promise<IUpdateCategory> {
        let response: IUpdateCategory;

        try {

            this.BusinessTypeCategoryRepositoryw.update({ id: updateCategoryDto.id }, { name: updateCategoryDto.name })
            response = responseHandler(null, "Business Type Category Updated", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }




}

