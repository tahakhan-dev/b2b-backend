import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateDigits {

  generateRandomDigits(digits: number): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
