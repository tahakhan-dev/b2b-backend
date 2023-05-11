import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


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
    businessEmail: string

    @IsOptional()
    @IsString()
    businessPhoneNumber: string

    @IsOptional()
    @IsBoolean()
    sysId: boolean




}
