import { IQuery } from '@nestjs/cqrs';
import { Request } from 'express';


export class GetBusinessesUserQuery implements IQuery {
    constructor(
        public readonly request: Request
    ) { }
}
