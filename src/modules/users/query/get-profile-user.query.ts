import { IQuery } from '@nestjs/cqrs';
import { Request } from 'express';


export class GetProfileUserQuery implements IQuery {
    constructor(
        public readonly request: Request
    ) { }
}
