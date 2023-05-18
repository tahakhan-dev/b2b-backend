import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}


