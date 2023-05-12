import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";
import { IsFiveDigitNumber } from "../functions/five-digit-code-number";
import { Transform } from "class-transformer";

export class VerificationCodeUserDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().toString().replace(/\s/g, ''))
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @IsFiveDigitNumber({ message: "Code should be a 5-digit number." })  // This is a custom validation decorator written using the class-validator library.
    code: number

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @IsNotEmpty()
    @IsEnum(UserSignUpType)
    signUpType: UserSignUpType;
}
