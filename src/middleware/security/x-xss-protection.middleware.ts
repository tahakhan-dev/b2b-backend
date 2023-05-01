import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

@Injectable()
export class XssProtectionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set the X-XSS-Protection header
    res.setHeader('X-XSS-Protection', '1; mode=block');
    // Call the next middleware in the chain
    next();
  }
}