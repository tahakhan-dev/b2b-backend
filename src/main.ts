import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {

  console.log(process.env.PORT,'======process.env.PORT=====')
  const APP_PORT = process.env.PORT

  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.useGlobalPipes( // Here, we are setting transform to true to enable automatic data transformation and whitelist to true to strip any properties that are not decorated with validation decorators
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );


  // rate limit for the APIS
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 1000, // limit each IP to 100 requests per windowMs,
      message: "Too many request created from this IP, please try again after an 5 minutes"
    }),
  );

  app.setGlobalPrefix(process.env.GLOABAL_API_PREFIX);


  // This function enables the automatic handling of shutdown signals or events by registering shutdown hooks in the application.

  app.enableShutdownHooks()

  await app.listen(APP_PORT, () => {
    console.log(`API GATEWAY IS RUNNING ON ${APP_PORT}`);

  });
}
bootstrap();
