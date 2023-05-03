import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';


@Injectable()
export class AppService {
  constructor(
    @InjectQueue('calculation') private readonly calculationQueue: Queue
  ) { }

  async getHello(): Promise<any> {
    return 'Hello World!';
  }

  async addCalculationJob(input: any): Promise<void> {

    let response = await this.calculationQueue.add('performCalculation', { input: 12323 });
    // Add a job to the "anotherProcess" process
    // let response = await this.calculationQueue.add('anotherProcess', { input:66565 });
    // Wait for job to complete and get result
    const completedJob = JSON.parse(await response.finished());

    const result = completedJob.result;
    console.log('Calculation job completed with result:', result);
    // Access the result of the completed job here and perform any further actions

  }


  async calculationResponseJob(): Promise<any> {
    try {

      let response = await this.calculationQueue.add('anotherProcess');
      console.log('===========response another =====================');

      // Add a job to the "anotherProcess" process
      // let response = await this.calculationQueue.add('anotherProcess', { input:66565 });
      // Wait for job to complete and get result
      const completedJob = JSON.parse(await response.finished());

      const result = completedJob.result;
      console.log('Calculation job completed with result:', result);
      return result
      // Access the result of the completed job here and perform any further actions
    } catch (error) {
      console.log('==============error==============', error);

      console.log('==========calculation =-======another response===============');
    }




  }


  async ResponseCalculationJob(): Promise<any> {

    let response = await this.calculationQueue.add('performCalculation');
    // Add a job to the "anotherProcess" process
    // let response = await this.calculationQueue.add('anotherProcess', { input:66565 });
    // Wait for job to complete and get result
    const completedJob = JSON.parse(await response.finished());

    const result = completedJob.result;
    console.log('Calculation job completed with result:', result);
    return result
    // Access the result of the completed job here and perform any further actions

  }

  async calculate4() {
    return 0
  }

  async calculate5() {
    let total = 0;
    for (let i = 0; i < 90000999000999999999999999999; i++) {
      total++;
    }
    return 0
  }

}
