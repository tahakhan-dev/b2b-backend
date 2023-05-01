import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigModule as EnvConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from './modules/databaseModule/database/database.module';
import { entitiesList } from './entitiesList/entities.list';
import { ShutdownService } from './shutdown.service';
import { MicroServiceHealthCheckService } from './microservice-health-check.service';
import { CalculationProcessor } from './utils/workerThreads/calculation.processor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './utils/interceptor/logging.interceptor';
import { HttpExceptionFilter } from './utils/filters/http-exeception.filter';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    //DB config
    ConfigModule,
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


    // Module listing
    DatabaseModule.forRoot({ entities: entitiesList }),

    UsersModule,

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
export class AppModule { }
