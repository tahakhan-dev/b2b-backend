import { IsNotEmpty, IsNumber } from "class-validator";


export class DeleteUserBusinessesDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;
}
