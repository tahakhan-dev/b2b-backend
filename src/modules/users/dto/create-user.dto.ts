import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @IsNotEmpty()
    @IsEnum(UserSignUpType)
    signUpType: UserSignUpType;

    @IsOptional()
    @IsString()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    profileImage: string;
}
