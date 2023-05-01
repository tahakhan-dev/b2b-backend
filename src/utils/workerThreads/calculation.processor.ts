// calculation.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('calculation')
export class CalculationProcessor {

    private delay(ms: number): Promise<void> {  //This technique can be helpful in scenarios where you want to prevent blocking the event loop but still need to perform some processing in small chunks or batches allow other tasks in the event loop to be processed while ensuring that your code continues to progress without waiting for any actual time to pass
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setImmediate(resolve);
            }, ms);
        });
    }

    @Process('performCalculation')
    async performCalculation(job: Job): Promise<void> {
        // Perform your extensive calculations here
        // const { input } = job.data;

        const result = 123; // Perform your calculations with input
        // You can do anything here, such as calling external APIs, querying databases, etc.

        // Update job progress
        job.progress(50); // Update the job progress to 50%

        // Mark the job as completed
        await job.moveToCompleted(JSON.stringify({ result }));
    }


    @Process('anotherProcess') // Specify a unique name for this handler
    async anotherProcess(job: Job): Promise<void> {
        try {
            // Perform another process here
            // You can define any custom logic for this process
            let total = 0;
            const randomNumber = Math.floor(Math.random() * 2);

            console.log(randomNumber, '========randomNumber====randomNumber');

            let records = [];
            const numbers = [];
            for (let i = 1; i <= 900; i++) {
                numbers.push(i);
            }
            console.log(numbers);

            if (randomNumber == 1) {
                // for (let i = 0; i < 900; i++) {
                for (const record of numbers) {
                    // }
                    console.log('==================i==============', record);

                    total++;
                    // await this.delay(0); // Using await delay(0) essentially allows the event loop to continue processing other tasks, if any, without blocking it, while still ensuring that the code after the await statement will not be executed until the next iteration of the event loop

                    // await new Promise((resolve) => setTimeout(resolve, 0));
                }
            }
            // Update job progress
            // job.progress(25); // Update the job progress to 25%

            // Mark the job as completed
            await job.moveToCompleted(JSON.stringify({ result: 'completed' }));
        } catch (error) {
            console.log('==========worker error ==============', error);

        }

    }
}
