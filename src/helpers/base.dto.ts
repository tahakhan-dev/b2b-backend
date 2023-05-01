import { IsNumberString, IsNotEmpty } from 'class-validator';

export class BaseDto {
    @IsNotEmpty()
    @IsNumberString()
    consumerId: string;

}
