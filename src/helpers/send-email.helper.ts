import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";
import { verifyEmailTemplate } from "src/common/template/verify-email.template";
import { UserEntity } from "src/modules/users/entities/user.entity";
import 'dotenv/config';

@Injectable()
export class SendEmail {
    // creating an instance of mailservice on fly
    constructor(
        private mailService: MailerService
    ) { }

    sendVerificationEmail(subject: string, userDto: Partial<UserEntity>, verificationNumber: number) {

        // sending mail only user and icon creater

        userDto.role != UserRole.ADMIN && UserSignUpType.CUSTOM ?
            this.mailService.sendMail({
                to: userDto.email,
                from: process.env.FROM_EMAIL,
                subject: subject,
                html: verifyEmailTemplate(userDto.userName, userDto.email, userDto.firstName, userDto.lastName, verificationNumber),
            }) : ''
    }



}