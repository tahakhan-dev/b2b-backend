import { IsEnum, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";

export class LoginUserDto {

    @IsOptional()
    @IsString()
    userName: string;

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
}
