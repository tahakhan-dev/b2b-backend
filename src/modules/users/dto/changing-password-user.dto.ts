import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";


export class ChangingPasswordUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().toString().replace(/\s/g, ''))
    email: string;

    @IsNotEmpty()
    @IsString()
    oldPassword: string


    @IsNotEmpty()
    @IsString()
    newPassword: string

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @IsNotEmpty()
    @IsEnum(UserSignUpType)
    signUpType: UserSignUpType;
}
