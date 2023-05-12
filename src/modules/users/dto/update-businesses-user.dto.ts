import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";


export class UpdateUserBusinessesDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber()
    @IsOptional()
    businessTypeId: number;

    @IsOptional()
    @IsString()
    businessName: string

    @IsOptional()
    @IsString()
    businessContactInfromation: string


    @IsOptional()
    @IsString()
    businessDescription: string

    @IsOptional()
    @IsString()
    businessLocations: string

    @IsOptional()
    @IsString()
    headquarters: string

    @IsOptional()
    @IsString()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().toString().replace(/\s/g, ''))
    businessEmail: string

    @IsOptional()
    @IsString()
    businessPhoneNumber: string

    @IsOptional()
    @IsBoolean()
    sysId: boolean




}
