import { MicroServiceHealthCheckService } from './microservice-health-check.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly healthCheckService: MicroServiceHealthCheckService) { }

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @Get('/health')
  async getHealth(): Promise<string> {
    try {
      await this.healthCheckService.isHealthy('exampleKey'); // Call the health check service
      return 'OK'; // If no error is thrown, it means the health check passed
    } catch (error) {
      // If an error is thrown, it means the health check failed
      return 'FAIL';
    }
  }

  @Post('/calculate')
  async calculate(@Body() input: any): Promise<any> {
    // Add a job to the queue and return immediately
    return await this.appService.addCalculationJob(input);
  }

  @Get('/calculate2')
  async calculate2(): Promise<any> {
    // Add a job to the queue and return immediately
    return await this.appService.calculationResponseJob();
  }

  @Get('/calculate3')
  async calculate3(): Promise<any> {
    // Add a job to the queue and return immediately
    let reponse = await this.appService.ResponseCalculationJob();
    console.log(reponse, '=========response================');
    return { result: reponse }
    // return await this.appService.ResponseCalculationJob();
  }

  @Get('/calculate4')
  async calculate4(): Promise<any> {
    // Add a job to the queue and return immediately
    let reponse = await this.appService.calculate4();
    console.log(reponse, '=========response================');
    return { result: reponse }
    // return await this.appService.ResponseCalculationJob();
  }

  @Get('/calculate5')
  async calculat5(): Promise<any> {
    // Add a job to the queue and return immediately
    let reponse = await this.appService.calculate5();
    console.log(reponse, '=========response================');
    return { result: reponse }
    // return await this.appService.ResponseCalculationJob();
  }
}
