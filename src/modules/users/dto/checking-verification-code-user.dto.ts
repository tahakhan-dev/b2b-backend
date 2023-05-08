import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";
import { IsFiveDigitNumber } from "../functions/five-digit-code-number";

export class VerificationCodeUserDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @IsFiveDigitNumber({ message: "Code should be a 5-digit number." })  // This is a custom validation decorator written using the class-validator library.
    Code: number

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @IsNotEmpty()
    @IsEnum(UserSignUpType)
    signUpType: UserSignUpType;
}
