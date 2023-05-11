import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UserBusinessesDto {

    @IsNumber()
    @IsNotEmpty()
    businessTypeId: number;

    @IsNotEmpty()
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
    businessEmail: string

    @IsOptional()
    @IsString()
    businessPhoneNumber: string

    @IsNotEmpty()
    @IsBoolean()
    sysId: boolean




}
