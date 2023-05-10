import { IsOptional, IsString } from "class-validator";


export class UpdateUserProfileUserDto {

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string


    @IsOptional()
    @IsString()
    phoneNumber: string

    @IsOptional()
    @IsString()
    profileImage: string

}
