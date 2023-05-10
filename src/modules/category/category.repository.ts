import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessTypeCategoryEntity } from "./entities/business-type-category.entity";
import { Repository } from "typeorm";
import 'dotenv/config';
import { Request } from 'express';
import { IBusinessTypeCategoryResult, IBusinessTypeCategory } from "./interface/category.interface";
import { responseHandler } from "src/helpers/response-handler";
import { Status } from "src/common/enums/status";
import { StatusCodes } from "src/common/enums/status-codes";


@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(BusinessTypeCategoryEntity, process.env.CONNECTION_NAME_2)
        private readonly BusinessTypeCategoryRepositoryR: Repository<BusinessTypeCategoryEntity>,
    ) { }



    async businessTypeCategory(): Promise<any> {
        return await this.getBusinessTypeCategory()
    }

    private async getBusinessTypeCategory(): Promise<IBusinessTypeCategory> {
        let response: IBusinessTypeCategory, result: Partial<IBusinessTypeCategoryResult[]>;

        try {
            result = await this.BusinessTypeCategoryRepositoryR.find()
            response = responseHandler(result, "Business Type Category", Status.SUCCESS, StatusCodes.SUCCESS);
        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }

}

