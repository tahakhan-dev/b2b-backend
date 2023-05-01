import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import helmet from 'helmet';

@Injectable()
export class XContentTypeOptionsMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    // Set X-Content-Type-Options header using helmet
    helmet.contentSecurityPolicy({
      directives: {
        'default-src': ["'self'"],
      },
    })(req, res, () => {
      // Call the next middleware in the chain
      next();
  });
  }
}
