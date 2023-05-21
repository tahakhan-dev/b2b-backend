import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'
import 'dotenv/config';
import { UserEntity } from '../users/entities/user.entity';
import { IBusinessTypeCategoryResult } from '../category/interface/category.interface';

@Injectable()
export class RedisService {

    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

    async addUserProfileValueToRedis(key: number, value: Partial<UserEntity>): Promise<boolean> {
        try {
            let profileUserProfileKey: string, redisResponse: any;

            console.log(value, '======value================');


            profileUserProfileKey = `${process.env.REDIS_USER_PROFILE_KEY_PREFIX}-${key}`
            redisResponse = await this.cacheManager.set(profileUserProfileKey, value)

            if (redisResponse !== 'OK') return false
            return true
        } catch (error) {
            return error
        }

    }

    async getUserProfileFromRedis(key: number): Promise<Partial<UserEntity> | null> {
        try {
            let profileUserProfileKey: string, redisResponse: any;

            profileUserProfileKey = `${process.env.REDIS_USER_PROFILE_KEY_PREFIX}-${key}`
            redisResponse = await this.cacheManager.get(profileUserProfileKey) as Partial<UserEntity>
            return redisResponse

        } catch (error) {
            return error
        }

    }

    async addBusinessCategoryValueToRedis(key: number, value: IBusinessTypeCategoryResult[]): Promise<boolean> {
        try {
            let businessCategoryKey: string, redisResponse: any;

            console.log(value);


            businessCategoryKey = `${process.env.REDIS_BUSINESS_CATEGORY_KEY_PREFIX}-${key}`
            redisResponse = await this.cacheManager.set(businessCategoryKey, value)

            if (redisResponse !== 'OK') return false
            return true
        } catch (error) {
            return error
        }

    }

    async getBusinessCategoryFromRedis(key: number): Promise<IBusinessTypeCategoryResult | null> {
        try {
            let businessCategoryKey: string, redisResponse;

            businessCategoryKey = `${process.env.REDIS_BUSINESS_CATEGORY_KEY_PREFIX}-${key}`
            redisResponse = await this.cacheManager.get(businessCategoryKey) as IBusinessTypeCategoryResult
            return redisResponse

        } catch (error) {
            return error
        }

    }

}
