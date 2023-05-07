import { IUserSearchOptionsByUserNameOrEmail } from "src/interface/conditions/users-condition.interface";
import { ICreateUser, ILoginUser, IVerificationLinkUser } from "./interface/res/user.interface";
import { UserVerificationCodeEntity } from "./entities/user-verfication-code.entity";
import { VerificationLinkUserDto } from "./dto/verification-link-user.dto";
import { GenerateDigits } from "src/common/functions/generate-digits";
import { UserConditions } from "src/common/functions/user-condition";
import { responseHandler } from "src/helpers/response-handler";
import { StatusCodes } from "../../common/enums/status-codes";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserValidation } from "./functions/user-validation";
import { SendEmail } from "src/helpers/send-email.helper";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "src/common/enums/user-role";
import { UserEntity } from "./entities/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { UserMapper } from "./mapper/user.mapper";
import { Status } from "src/common/enums/status";
import { Repository } from "typeorm";
import * as moment from 'moment';
import 'dotenv/config';
import { UserForgetPasswordCodeEntity } from "./entities/user-forgetpassword-verfication.entity";


@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepositoryW: Repository<UserEntity>,
        @InjectRepository(UserEntity, process.env.CONNECTION_NAME_2)
        private readonly userRepositoryR: Repository<UserEntity>,
        @InjectRepository(UserVerificationCodeEntity)
        private readonly userVerificationCodeRepositoryW: Repository<UserVerificationCodeEntity>,
        @InjectRepository(UserVerificationCodeEntity, process.env.CONNECTION_NAME_2)
        private readonly userVerificationCodeRepositoryR: Repository<UserVerificationCodeEntity>,
        @InjectRepository(UserForgetPasswordCodeEntity)
        private readonly UserForgetPasswordRepositoryW: Repository<UserForgetPasswordCodeEntity>,
        @InjectRepository(UserForgetPasswordCodeEntity, process.env.CONNECTION_NAME_2)
        private readonly UserForgetPasswordRepositoryR: Repository<UserForgetPasswordCodeEntity>,
        @Inject(UserMapper) private readonly mapper: UserMapper,
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(GenerateDigits) private readonly randomDigit: GenerateDigits,
        @Inject(UserConditions) private readonly userCondition: UserConditions,
        @Inject(SendEmail) private readonly SendEmailService: SendEmail,
        @Inject(UserValidation) private readonly UserValidationService: UserValidation

    ) { }


    async createUser(createUserDto: CreateUserDto): Promise<any> {
        return await this.saveUser(createUserDto);
    }

    async sendVerificationLinkUser(verificationLinkUserDto: VerificationLinkUserDto): Promise<any> {
        return await this.sendVerificationLink(verificationLinkUserDto);
    }

    async resendForgetPasswordLinkUser(verificationLinkUserDto: VerificationLinkUserDto): Promise<any> {
        return await this.resendForgetPasswordLink(verificationLinkUserDto);
    }



    async loginUser(loginUserDto: LoginUserDto): Promise<any> {
        return await this.signIn(loginUserDto);
    }

    private async sendVerificationLink(verificationLinkUserDto: VerificationLinkUserDto): Promise<IVerificationLinkUser> {
        let response: IVerificationLinkUser, randomNumber: number, getUserWhereClause: IUserSearchOptionsByUserNameOrEmail,
            getUser: UserEntity, validationError: IVerificationLinkUser, verficationMapper: UserVerificationCodeEntity

        try {

            validationError = this.UserValidationService.verficationLinkValidation(verificationLinkUserDto);

            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(verificationLinkUserDto.email, undefined)
            getUser = await this.userRepositoryR.findOne(getUserWhereClause);

            validationError = this.UserValidationService.verficationLinkValidation(getUser);

            if (validationError) return validationError

            randomNumber = this.randomDigit.generateRandomDigits(5);
            verficationMapper = this.mapper.createVerificationObj(getUser.id, randomNumber)

            await this.userVerificationCodeRepositoryW.update({ userId: getUser.id }, { isActive: false, isDeleted: true })
            await this.userVerificationCodeRepositoryW.save(verficationMapper)

            response = responseHandler(null, "Verfication link send ", Status.SUCCESS, StatusCodes.SUCCESS)
        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response;
    }

    private async resendForgetPasswordLink(verificationLinkUserDto: VerificationLinkUserDto): Promise<IVerificationLinkUser> {
        let response: IVerificationLinkUser, randomNumber: number, getUserWhereClause: IUserSearchOptionsByUserNameOrEmail,
            getUser: UserEntity, validationError: IVerificationLinkUser, verficationMapper: UserVerificationCodeEntity

        try {

            validationError = this.UserValidationService.verficationLinkValidation(verificationLinkUserDto);

            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(verificationLinkUserDto.email, undefined)
            getUser = await this.userRepositoryR.findOne(getUserWhereClause);

            validationError = this.UserValidationService.verficationLinkValidation(getUser);

            if (validationError) return validationError

            randomNumber = this.randomDigit.generateRandomDigits(5);
            verficationMapper = this.mapper.createVerificationObj(getUser.id, randomNumber)

            await this.UserForgetPasswordRepositoryW.update({ userId: getUser.id }, { isActive: false, isDeleted: true })
            await this.UserForgetPasswordRepositoryW.save(verficationMapper)

            response = responseHandler(null, "ForgerPassword link send ", Status.SUCCESS, StatusCodes.SUCCESS)
        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response;
    }





    private async signIn(loginUserDto: LoginUserDto): Promise<ILoginUser> {
        let response;
        try {

            console.log(loginUserDto, '===========loginUserDto========');


            response = responseHandler(null, "sent you email for verification", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {

            let errorResponse = error.detail ? error.detail.replace(/Key \(|\)=|\)/g, "").replace(/\(/g, " ").replace(/\s+/g, " ") :
                error.driverError ? `${error.driverError.message}`.split(':')[0] : 'there is some error '

            response = responseHandler(null, errorResponse, Status.FAILED,
                error.detail ? StatusCodes.CONFLICT :
                    error.driverError.message ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            )
        }

        return response
    }



    private async saveUser(createUserDto: CreateUserDto): Promise<ICreateUser> {
        let response: ICreateUser, mappedUser: Partial<UserEntity>, randomNumber: number,
            userCreated: UserEntity, verficationMapper: UserVerificationCodeEntity,
            getUserWhereClause: IUserSearchOptionsByUserNameOrEmail, getUser: UserEntity,
            customMessage: string, errorResponse: string;

        try {

            getUserWhereClause = this.userCondition.usernameOrEmail(createUserDto.email, createUserDto.userName)

            getUser = await this.userRepositoryR.findOne(getUserWhereClause);

            if (getUser) return responseHandler(null, "This User Already Exists", Status.FAILED, StatusCodes.CONFLICT);

            if (createUserDto.role as UserRole == UserRole.ADMIN && createUserDto.signUpType as UserSignUpType == UserSignUpType.SOCIAL) return responseHandler(null, "You can't sign up with social login", Status.FAILED, StatusCodes.FORBIDDEN);


            createUserDto.password = createUserDto && createUserDto.signUpType == UserSignUpType.CUSTOM ?
                await this.authService.hashPassword(createUserDto.password) :
                await this.authService.hashPassword(createUserDto.email.split('@')[0]);

            mappedUser = this.mapper.createuserObj(createUserDto);

            userCreated = await this.userRepositoryW.save(mappedUser);

            if (mappedUser && mappedUser.signUpType as UserSignUpType == UserSignUpType.CUSTOM && mappedUser.role as UserRole != UserRole.ADMIN) {

                randomNumber = this.randomDigit.generateRandomDigits(5);
                verficationMapper = this.mapper.createVerificationObj(userCreated.id, randomNumber)

                await this.userVerificationCodeRepositoryW.save(verficationMapper)
                // this.SendEmailService.sendVerificationEmail('Email Verification ✔', mappedUser, randomNumber)
            }

            customMessage = mappedUser && mappedUser.signUpType as UserSignUpType == UserSignUpType.CUSTOM &&
                mappedUser.role as UserRole != UserRole.ADMIN ? 'Sent You Email For Verification' : 'User Created'

            response = responseHandler(null, customMessage, Status.SUCCESS, StatusCodes.CREATED);


        } catch (error) {

            errorResponse = error?.detail ? error?.detail.replace(/Key \(|\)=|\)/g, "").replace(/\(/g, " ").replace(/\s+/g, " ") :
                error?.driverError ? `${error?.driverError?.message}`.split(':')[0] : error?.message

            response = responseHandler(null, errorResponse, Status.FAILED,
                error?.detail == undefined ? StatusCodes.INTERNAL_SERVER_ERROR : error?.detail ? StatusCodes.CONFLICT :
                    error?.driverError?.message ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
            )
        }

        return response
    }


}


