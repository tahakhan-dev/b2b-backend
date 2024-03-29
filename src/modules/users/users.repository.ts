import { IResetPasswordUser, ICreateUser, IForgetPasswordCodeUser, ILoginUser, IVerificationLinkUser, IVerificationCodeUser, IChangingPasswordUser, IUpdateProfileUser, IGetProfileUser, IAddBusinessUser, IUpdateBusinessUser, IDeleteBusinessUser, IGetBusinessesUser, GetBusinessUserResult } from "./interface/res/user.interface";
import { IDeleteConditon, IUpdateByIdAndUserId, IUpdateByUserIdAndIsActive, IUserCodeByUserId, IUserSearchOptionsByUserNameOrEmail } from "src/interface/conditions/users-condition.interface";
import { UserForgetPasswordCodeEntity } from "./entities/user-forgetpassword-verfication.entity";
import { ForgetPasswordCodeUserDto } from "./dto/checking-forgetpassword-code-user.dto";
import { ResendForgetPasswordLinkUserDto } from "./dto/forget-password-link-user.dto";
import { UserVerificationCodeEntity } from "./entities/user-verfication-code.entity";
import { VerificationCodeUserDto } from "./dto/checking-verification-code-user.dto";
import { UpdateUserBusinessesDto } from "./dto/update-businesses-user.dto";
import { ChangingPasswordUserDto } from "./dto/changing-password-user.dto";
import { VerificationLinkUserDto } from "./dto/verification-link-user.dto";
import { DeleteUserBusinessesDto } from "./dto/delete-businesses-user.dto";
import { UserBusinessesEntity } from "./entities/user-businesses.entity";
import { UpdateUserProfileUserDto } from "./dto/update-profile-user.dto";
import { IDecryptWrapper } from "src/interface/base.response.interface";
import { GenerateDigits } from "src/common/functions/generate-digits";
import { UserConditions } from "src/common/functions/user-condition";
import { ResetPasswordUserDto } from "./dto/reset-password-user.dto";
import { AddUserBusinessesDto } from "./dto/add-user-businesses.dto";
import { ArrayFilterHelper } from "src/helpers/array-filter.helper";
import { TokenFunctions } from "src/common/functions/token-generic-function";
import { responseHandler } from "src/helpers/response-handler";
import { StatusCodes } from "../../common/enums/status-codes";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserValidation } from "./functions/user-validation";
import { SendEmail } from "src/helpers/send-email.helper";
import { RedisService } from "../redis/redis.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "src/common/enums/user-role";
import { UserEntity } from "./entities/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { UserMapper } from "./mapper/user.mapper";
import { Status } from "src/common/enums/status";
import { LessThan, Repository } from "typeorm";
import { Request } from 'express';
import * as moment from 'moment';
import 'dotenv/config';


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
        @InjectRepository(UserBusinessesEntity)
        private readonly UserBusinessesRepositoryW: Repository<UserBusinessesEntity>,
        @InjectRepository(UserBusinessesEntity, process.env.CONNECTION_NAME_2)
        private readonly UserBusinessesRepositoryR: Repository<UserBusinessesEntity>,


        @Inject(UserMapper) private readonly mapper: UserMapper,
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(RedisService) private readonly redisService: RedisService,
        @Inject(GenerateDigits) private readonly randomDigit: GenerateDigits,
        @Inject(UserConditions) private readonly userCondition: UserConditions,
        @Inject(SendEmail) private readonly sendEmailService: SendEmail,
        @Inject(UserValidation) private readonly userValidationService: UserValidation,
        @Inject(TokenFunctions) private readonly tokenService: TokenFunctions,
        @Inject(ArrayFilterHelper) private readonly arrayFilterService: ArrayFilterHelper,

    ) { }


    async createUser(createUserDto: CreateUserDto): Promise<any> {
        return await this.saveUser(createUserDto);
    }

    async sendVerificationLinkUser(verificationLinkUserDto: VerificationLinkUserDto): Promise<any> {
        return await this.sendVerificationLink(verificationLinkUserDto);
    }

    async resendForgetPasswordLinkUser(resendForgetPasswordLinkUserDto: ResendForgetPasswordLinkUserDto): Promise<any> {
        return await this.resendForgetPasswordLink(resendForgetPasswordLinkUserDto);
    }

    async forgetPasswordCodeUser(forgetPasswordCodeUserDto: ForgetPasswordCodeUserDto): Promise<any> {
        return await this.checkingForgetPasswordUserCode(forgetPasswordCodeUserDto);
    }

    async verificationCodeUser(verificationCodeUserDto: VerificationCodeUserDto): Promise<any> {
        return await this.checkingVerificationUserCode(verificationCodeUserDto);
    }

    async resetPasswordUser(resetPasswordUserDto: ResetPasswordUserDto): Promise<any> {
        return await this.resetUserPassword(resetPasswordUserDto);
    }

    async changingPasswordUser(changingPasswordUserDto: ChangingPasswordUserDto): Promise<any> {
        return await this.changingUserPassword(changingPasswordUserDto);
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<any> {
        return await this.signIn(loginUserDto);
    }

    async updateProfile(updateUserProfileUserDto: UpdateUserProfileUserDto, request: Request): Promise<any> {
        return await this.updateProfileUser(updateUserProfileUserDto, request);
    }

    async addBusinessesUser(addUserBusinessesDto: AddUserBusinessesDto, request: Request): Promise<any> {
        return await this.addUserBusiness(addUserBusinessesDto, request);
    }

    async updateBusinessesUser(updateUserBusinessesDto: UpdateUserBusinessesDto, request: Request): Promise<any> {
        return await this.updateUserBusiness(updateUserBusinessesDto, request);
    }

    async deleteBusinessesUser(deleteUserBusinessesDto: DeleteUserBusinessesDto, request: Request): Promise<any> {
        return await this.deleteUserBusiness(deleteUserBusinessesDto, request);
    }

    // -------------------- get calls-----------------------------
    async getUserProfile(request: Request): Promise<any> {
        return await this.getProfileUser(request)
    }

    async getUserBusinesses(request: Request): Promise<any> {
        return await this.getBusinessesUser(request)
    }



    // --------------------------------- IMPLEMENTATION BUSSINESS LOGIC ---------------------------------------------------------

    private async saveUser(createUserDto: CreateUserDto): Promise<ICreateUser> { // declare multiple  variables
        let response: ICreateUser, mappedUser: Partial<UserEntity>, randomNumber: number,
            userCreated: UserEntity, verficationMapper: UserVerificationCodeEntity,
            getUserWhereClause: IUserSearchOptionsByUserNameOrEmail, getUser: UserEntity,
            customMessage: string, errorResponse: string, validationError: ICreateUser;

        try {

            getUserWhereClause = this.userCondition.usernameOrEmail(createUserDto.email, createUserDto.userName, createUserDto.role as UserRole); // geting condition of username or email
            getUser = await this.userRepositoryR.findOne(getUserWhereClause); // finding user

            validationError = this.userValidationService.userExistsValidation(createUserDto, getUser); // validating user 
            if (validationError) return validationError


            createUserDto.password = createUserDto && createUserDto.signUpType == UserSignUpType.CUSTOM ? // hasing password if user is custom
                await this.authService.hashPassword(createUserDto.password) :
                await this.authService.hashPassword(createUserDto.email.split('@')[0]); // spliting email and assigning password

            mappedUser = this.mapper.createuserObj(createUserDto); // creating user object

            userCreated = await this.userRepositoryW.save(mappedUser); // storing data

            if (mappedUser && mappedUser.signUpType as UserSignUpType == UserSignUpType.CUSTOM && mappedUser.role as UserRole != UserRole.ADMIN) { // if user is custom and not admin then send user verfication link

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

    private async sendVerificationLink(verificationLinkUserDto: VerificationLinkUserDto): Promise<IVerificationLinkUser> {
        let response: IVerificationLinkUser, randomNumber: number, getUserWhereClause: IUserSearchOptionsByUserNameOrEmail,
            getUser: UserEntity, validationError: IVerificationLinkUser, verficationMapper: UserVerificationCodeEntity, updateUserCondition: IUpdateByUserIdAndIsActive, deleteConditon: IDeleteConditon

        try {

            validationError = this.userValidationService.verficationLinkValidation(verificationLinkUserDto, undefined, undefined); // validating user
            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(verificationLinkUserDto.email, undefined, verificationLinkUserDto.role as UserRole) // geting user condition

            getUser = await this.userRepositoryR.findOne(getUserWhereClause); // finding user


            validationError = this.userValidationService.verficationLinkValidation(verificationLinkUserDto, getUser, true);

            if (validationError) return validationError

            randomNumber = this.randomDigit.generateRandomDigits(5);
            verficationMapper = this.mapper.createVerificationObj(getUser.id, randomNumber)
            updateUserCondition = this.userCondition.updateByUserIdAndIsActive(getUser.id, true);
            deleteConditon = this.userCondition.deleteCondition()
            await this.userVerificationCodeRepositoryW.update(updateUserCondition, deleteConditon)
            await this.userVerificationCodeRepositoryW.save(verficationMapper)

            response = responseHandler(null, "Verfication link send ", Status.SUCCESS, StatusCodes.SUCCESS)
        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response;
    }

    private async resendForgetPasswordLink(verificationLinkUserDto: ResendForgetPasswordLinkUserDto): Promise<IVerificationLinkUser> {
        let response: IVerificationLinkUser, randomNumber: number, getUserWhereClause: IUserSearchOptionsByUserNameOrEmail,
            getUser: UserEntity, validationError: IVerificationLinkUser, verficationMapper: UserVerificationCodeEntity, updateUserCondition: IUpdateByUserIdAndIsActive, deleteConditon: IDeleteConditon

        try {

            validationError = this.userValidationService.verficationLinkValidation(verificationLinkUserDto);

            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(verificationLinkUserDto.email, undefined, verificationLinkUserDto.role as UserRole)
            getUser = await this.userRepositoryR.findOne(getUserWhereClause);

            validationError = this.userValidationService.verficationLinkValidation(getUser);

            if (validationError) return validationError

            randomNumber = this.randomDigit.generateRandomDigits(5);
            verficationMapper = this.mapper.createVerificationObj(getUser.id, randomNumber)

            updateUserCondition = this.userCondition.updateByUserIdAndIsActive(getUser.id, true);
            deleteConditon = this.userCondition.deleteCondition()

            await this.UserForgetPasswordRepositoryW.update(updateUserCondition, deleteConditon)
            await this.UserForgetPasswordRepositoryW.save(verficationMapper)

            response = responseHandler(null, "ForgerPassword link send ", Status.SUCCESS, StatusCodes.SUCCESS)
        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response;
    }

    private async checkingForgetPasswordUserCode(forgetPasswordCodeUserDto: ForgetPasswordCodeUserDto): Promise<IForgetPasswordCodeUser> {
        let response: IForgetPasswordCodeUser, validationError: IForgetPasswordCodeUser, getuser: Partial<UserEntity>,
            getUserWhereClause: IUserSearchOptionsByUserNameOrEmail, getUsercode: Partial<UserForgetPasswordCodeEntity>,
            getVerificationCode: IUserCodeByUserId, deleteConditon: IDeleteConditon, updateUserCondition: IUpdateByUserIdAndIsActive

        try {

            validationError = this.userValidationService.userForgetPasswordCodeValidation(forgetPasswordCodeUserDto);

            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(forgetPasswordCodeUserDto.email, undefined, forgetPasswordCodeUserDto.role as UserRole)
            getuser = await this.userRepositoryR.findOne(getUserWhereClause);

            validationError = this.userValidationService.userForgetPasswordCodeValidation(undefined, getuser, true);

            if (validationError) return validationError

            getVerificationCode = this.userCondition.getUserCodeByUserId(getuser.id, forgetPasswordCodeUserDto.code)
            getUsercode = await this.UserForgetPasswordRepositoryR.findOne(getVerificationCode);

            if (!getUsercode) return responseHandler(null, "This Code does not belong to this user or it's expire try again by generating new code ", Status.SUCCESS, StatusCodes.NOT_FOUND)

            const currentDate = moment.utc();

            const diffInMinutes: number = currentDate.diff(moment.utc(getUsercode.tokenCreationDate), 'minutes');
            deleteConditon = this.userCondition.deleteCondition()
            updateUserCondition = this.userCondition.updateByUserIdAndIsActive(getuser.id, true);

            if (diffInMinutes > 10) {
                // storedDate is expired
                await this.UserForgetPasswordRepositoryW.update({ ...updateUserCondition, tokenCreationDate: LessThan(currentDate.format('YYYY-MM-DD HH:mm:ss')) }, deleteConditon)
                response = responseHandler(null, "code has expired. Please request a new code and try again", Status.SUCCESS, StatusCodes.BAD_REQUEST)
            } else {
                // storedDate is still valid
                await this.UserForgetPasswordRepositoryW.update(updateUserCondition, deleteConditon)
                response = responseHandler(null, "Valid Code", Status.SUCCESS, StatusCodes.SUCCESS)
            }
            return response

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response;
    }

    private async checkingVerificationUserCode(verificationCodeUserDto: VerificationCodeUserDto): Promise<IVerificationCodeUser> {
        let response: IVerificationCodeUser, validationError: IVerificationCodeUser, getuser: Partial<UserEntity>,
            getUserWhereClause: IUserSearchOptionsByUserNameOrEmail, getUsercode: Partial<UserVerificationCodeEntity>,
            getVerificationCode: IUserCodeByUserId, deleteConditon: IDeleteConditon, updateUserCondition: IUpdateByUserIdAndIsActive;

        try {


            validationError = this.userValidationService.userVerificationCodeValidation(verificationCodeUserDto);

            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(verificationCodeUserDto.email, undefined, verificationCodeUserDto.role as UserRole)
            getuser = await this.userRepositoryR.findOne(getUserWhereClause);

            validationError = this.userValidationService.userVerificationCodeValidation(undefined, getuser, true);

            if (validationError) return validationError


            getVerificationCode = this.userCondition.getUserCodeByUserId(getuser.id, verificationCodeUserDto.code)
            getUsercode = await this.userVerificationCodeRepositoryR.findOne(getVerificationCode);

            if (!getUsercode) return responseHandler(null, "This Code does not belong to this user or it's expire try again by generating new code ", Status.SUCCESS, StatusCodes.NOT_FOUND)

            const currentDate = moment.utc();

            const diffInMinutes: number = currentDate.diff(moment.utc(getUsercode.tokenCreationDate), 'minutes');
            deleteConditon = this.userCondition.deleteCondition()
            updateUserCondition = this.userCondition.updateByUserIdAndIsActive(getuser.id, true);

            if (diffInMinutes > 10) {
                // storedDate is expired
                await this.userVerificationCodeRepositoryW.update({ ...updateUserCondition, tokenCreationDate: LessThan(currentDate.format('YYYY-MM-DD HH:mm:ss')) }, deleteConditon)
                response = responseHandler(null, "code has expired. Please request a new code and try again", Status.SUCCESS, StatusCodes.BAD_REQUEST)
            } else {
                // storedDate is still valid
                await this.userVerificationCodeRepositoryW.update(updateUserCondition, deleteConditon)
                await this.userRepositoryW.update({ id: getuser.id, isActive: true }, { emailVerified: true })
                response = responseHandler(null, "Your User has Been Verified ", Status.SUCCESS, StatusCodes.SUCCESS)
            }

            return response

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response;
    }

    private async resetUserPassword(resetPasswordUserDto: ResetPasswordUserDto): Promise<IResetPasswordUser> {
        let response: IResetPasswordUser, validationError: IResetPasswordUser, getUserWhereClause: IUserSearchOptionsByUserNameOrEmail,
            getuser: Partial<UserEntity>, hashResetPassword: string, isOldPassword: boolean;
        try {

            validationError = this.userValidationService.userResetPasswordValidation(resetPasswordUserDto, undefined, false);

            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(resetPasswordUserDto.email, undefined, resetPasswordUserDto.role as UserRole)
            getuser = await this.userRepositoryR.findOne(getUserWhereClause);

            validationError = this.userValidationService.userResetPasswordValidation(undefined, getuser, true);

            if (validationError) return validationError

            isOldPassword = await this.authService.comparePasswords(resetPasswordUserDto.password, getuser.password)
            if (isOldPassword) return responseHandler(null, "This Is Your Old Password Try New One ", Status.FAILED, StatusCodes.CONFLICT)

            hashResetPassword = await this.authService.hashPassword(resetPasswordUserDto.password);

            await this.userRepositoryW.update({ id: getuser.id, isActive: true }, { password: hashResetPassword });

            response = responseHandler(null, "Your Password Is Changed ", Status.SUCCESS, StatusCodes.SUCCESS)

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)

        }
        return response;

    }

    private async changingUserPassword(changingPasswordUserDto: ChangingPasswordUserDto): Promise<IChangingPasswordUser> {
        let response: IChangingPasswordUser, validationError: IChangingPasswordUser, getUserWhereClause: IUserSearchOptionsByUserNameOrEmail, getuser: Partial<UserEntity>,
            isOldPassword: boolean, hashPassword: string;
        try {

            validationError = this.userValidationService.userResetPasswordValidation(changingPasswordUserDto, undefined, false);

            if (validationError) return validationError

            getUserWhereClause = this.userCondition.usernameOrEmail(changingPasswordUserDto.email, undefined, changingPasswordUserDto.role as UserRole)
            getuser = await this.userRepositoryR.findOne(getUserWhereClause);


            validationError = this.userValidationService.userResetPasswordValidation(undefined, getuser, true);

            if (validationError) return validationError


            isOldPassword = await this.authService.comparePasswords(changingPasswordUserDto.newPassword, getuser.password);

            if (isOldPassword) return responseHandler(null, "This is your old password enter new password ", Status.SUCCESS, StatusCodes.BAD_REQUEST);

            hashPassword = await this.authService.hashPassword(changingPasswordUserDto.newPassword);
            await this.userRepositoryW.update({ id: getuser.id, isActive: true }, { password: hashPassword });

            response = responseHandler(null, "Your Password Is Changed ", Status.SUCCESS, StatusCodes.SUCCESS)

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)

        }
        return response;

    }

    private async signIn(loginUserDto: LoginUserDto): Promise<ILoginUser> {
        let response: ILoginUser, getUserWhereClause: IUserSearchOptionsByUserNameOrEmail, getUser: UserEntity,
            validationError: ILoginUser, checkingUserPassword: boolean, usertoken: string, filterArray;
        try {

            getUserWhereClause = this.userCondition.usernameOrEmail(loginUserDto.email, loginUserDto.userName, loginUserDto.role as UserRole);

            getUser = await this.userRepositoryR.findOne(getUserWhereClause);

            validationError = this.userValidationService.loginUserValidation(getUser, loginUserDto);
            if (validationError) return validationError

            checkingUserPassword = await this.authService.comparePasswords(loginUserDto.password, getUser.password);
            if (!checkingUserPassword) return responseHandler(null, "Invalid User Name Or Password", Status.SUCCESS, StatusCodes.SUCCESS);
            usertoken = await this.authService.generateJWT(getUser);
            getUser.token = usertoken

            this.redisService.addUserProfileValueToRedis(getUser.id, getUser)

            filterArray = this.arrayFilterService.filterArray([getUser], [
                'password',
                'id',
                'isActive',
                'isDeleted',
                'serverCreatedOn',
                'serverUpdatedOn',
                'signUpType',
                'optVerification',
                'isBlock'
            ]);

            response = responseHandler(filterArray, "Login Successfully", Status.SUCCESS, StatusCodes.SUCCESS);

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

    private async updateProfileUser(updateUserProfileUserDto: UpdateUserProfileUserDto, request: Request): Promise<IUpdateProfileUser> {
        let response: IUpdateProfileUser, decryptResponse: IDecryptWrapper;
        try {

            decryptResponse = this.tokenService.decryptUserToken(request);
            await this.userRepositoryW.update({ id: decryptResponse.userId }, updateUserProfileUserDto)
            response = responseHandler(null, "Your Profile Is Updated ", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    private async addUserBusiness(addUserBusinessesDto: AddUserBusinessesDto, request: Request): Promise<IAddBusinessUser> {
        let response: IAddBusinessUser, decryptResponse: IDecryptWrapper, userBusinessMapper: UserBusinessesEntity;
        try {

            decryptResponse = this.tokenService.decryptUserToken(request);
            userBusinessMapper = this.mapper.createUserBusinessObj(decryptResponse, addUserBusinessesDto);

            await this.UserBusinessesRepositoryW.save(userBusinessMapper)

            response = responseHandler(null, "User Business Added", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    private async updateUserBusiness(updateUserBusinessesDto: UpdateUserBusinessesDto, request: Request): Promise<IUpdateBusinessUser> {
        let response: IUpdateBusinessUser, updateUserBusinessMapper: UserBusinessesEntity, decryptResponse: IDecryptWrapper, updateByUserIdAndId: IUpdateByIdAndUserId;
        try {

            decryptResponse = this.tokenService.decryptUserToken(request);
            updateUserBusinessMapper = this.mapper.UpdateUserBusinessObj(updateUserBusinessesDto);
            updateByUserIdAndId = this.userCondition.updateByIdAndUserId(updateUserBusinessesDto.id, decryptResponse.userId)

            await this.UserBusinessesRepositoryW.update(updateByUserIdAndId, updateUserBusinessMapper)

            response = responseHandler(null, "User Business Update", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    private async deleteUserBusiness(deleteUserBusinessesDto: DeleteUserBusinessesDto, request: Request): Promise<IDeleteBusinessUser> {
        let response: IUpdateBusinessUser, decryptResponse: IDecryptWrapper, updateByUserIdAndId: IUpdateByIdAndUserId, isDeleted: IDeleteConditon;
        try {

            decryptResponse = this.tokenService.decryptUserToken(request);
            updateByUserIdAndId = this.userCondition.updateByIdAndUserId(deleteUserBusinessesDto.id, decryptResponse.userId)
            isDeleted = this.userCondition.deleteCondition()

            await this.UserBusinessesRepositoryW.update(updateByUserIdAndId, isDeleted)

            response = responseHandler(null, "User Business Deleted", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }

    // ----------------------------------------    GET CALLS LOGICS  ------------------------------------------

    private async getProfileUser(request: Request): Promise<IGetProfileUser> {
        let response: IGetProfileUser, decryptResponse: IDecryptWrapper, result: Partial<UserEntity>, filterArray: any, redisGetProfile: Partial<UserEntity>, consumerToken: string | boolean

        try {
            decryptResponse = this.tokenService.decryptUserToken(request);
            consumerToken = this.tokenService.getUserToken(request)

            if (consumerToken) redisGetProfile = await this.redisService.getUserProfileFromRedis(decryptResponse.userId);

            result = redisGetProfile ? redisGetProfile : await this.userRepositoryR.findOne({ where: { id: decryptResponse.userId } })
            result.token = consumerToken as string
                        
            if (!redisGetProfile && consumerToken) await this.redisService.addUserProfileValueToRedis(decryptResponse.userId, result);

            filterArray = this.arrayFilterService.filterArray([result], [
                'password',
                'id',
                'isActive',
                'isDeleted',
                'serverCreatedOn',
                'serverUpdatedOn',
                'signUpType',
                'emailVerified',
                'optVerification',
                'isBlock',
                'token'
            ])

            response = responseHandler(filterArray, "Your Profile ", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response
    }


    private async getBusinessesUser(request: Request): Promise<IGetBusinessesUser> {
        let response: IGetBusinessesUser, decryptResponse: IDecryptWrapper, result: Partial<GetBusinessUserResult[]>;
        try {
            decryptResponse = this.tokenService.decryptUserToken(request);
            result = await this.UserBusinessesRepositoryR.find({
                where: { userId: decryptResponse.userId },
                relations: ['businessType']
            });
            response = responseHandler(result, "Your Businesses ", Status.SUCCESS, StatusCodes.SUCCESS);

        } catch (error) {
            response = responseHandler(null, error?.message, Status.FAILED, StatusCodes.INTERNAL_SERVER_ERROR)
        }
        return response

    }





}


