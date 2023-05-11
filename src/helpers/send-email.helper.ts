import { verifyEmailTemplate } from "src/common/template/verify-email.template";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserSignUpType } from "src/common/enums/signup-type";
import { MailerService } from "@nestjs-modules/mailer";
import { UserRole } from "src/common/enums/user-role";
import { Injectable } from "@nestjs/common";
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