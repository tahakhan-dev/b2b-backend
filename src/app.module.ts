import { MicroServiceHealthCheckService } from './microservice-health-check.service';
import { DatabaseModule } from './modules/database/connection/database.module';
import { CalculationProcessor } from './utils/workerThreads/calculation.processor';
import { LoggingInterceptor } from './utils/interceptor/logging.interceptor';
import { HttpExceptionFilter } from './utils/filters/http-exeception.filter';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import { entitiesList } from './entitiesList/entities.list';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ShutdownService } from './shutdown.service';
import { AppController } from './app.controller';
import { MiddlewareConsumer, Module, RequestMethod, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { CompressionMiddleware } from './middleware/compression.middleware';


@Module({
  imports: [
    EnvConfigModule.forRoot({ isGlobal: true }),
    // Bull Queue
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'calculation',
    }),



    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_SMTP,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      }
    }),

    // Module listing
    DatabaseModule.forRoot({ entities: entitiesList }),

    UsersModule,
    CategoryModule,

  ],
  controllers: [AppController],
  providers: [AppService,
    ShutdownService,
    MicroServiceHealthCheckService,
    CalculationProcessor,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CompressionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
