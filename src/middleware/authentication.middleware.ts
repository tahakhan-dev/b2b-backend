
import {  Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable() //makeing all injectable class so later on we can use this class as an nestjs DI container 
export class AuthenticationMiddleware implements NestMiddleware {
    constructor() { }

    async use(req: Request, res: Response, next: NextFunction) {
        // Authenticate the request

        // await this.cacheManager
        // const value = await this.cacheManager.get('');
        // console.log(value, '========value===========');


        next();
    }
}
