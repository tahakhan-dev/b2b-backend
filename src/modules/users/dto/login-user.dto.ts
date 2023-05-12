import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsBoolean, IsEmail } from "class-validator";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";

export class LoginUserDto {

    @IsOptional()
    @IsString()
    userName: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().toString().replace(/\s/g, ''))
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


}
