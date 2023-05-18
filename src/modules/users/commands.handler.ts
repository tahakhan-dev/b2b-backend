import { IResetPasswordUser, ICreateUser, IForgetPasswordCodeUser, ILoginUser, IVerificationLinkUser, IVerificationCodeUser, IChangingPasswordUser, IUpdateProfileUser, IAddBusinessUser, IUpdateBusinessUser, IDeleteBusinessUser } from "./interface/res/user.interface";
import { ResendForgetPasswordLinkCommand } from "./commands/resend-forgetpassword-link-user.command";
import { ForgetPasswordCodeUserCommand } from "./commands/forget-password-code-user.command";
import { VerificationLinkUserCommand } from "./commands/verification-link-user.command";
import { UpdateBusinessesUserCommand } from "./commands/update-businesses-user.command";
import { DeleteBusinessesUserCommand } from "./commands/delete-businesses-user.command";
import { VerificationCodeUserCommand } from "./commands/verification-code-user.command";
import { ChangingPasswordUserCommand } from "./commands/changing-password-user.command";
import { UpdateProfileUserCommand } from "./commands/update-profile-user.command";
import { ResetPasswordUserCommand } from "./commands/reset-password-user.command";
import { AddBusinessesUserCommand } from "./commands/add-businesses-user.command";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./commands/create-user.command";
import { LoginUserCommand } from "./commands/login-user.command";
import { UserRepository } from "./users.repository";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    //The execute method returns a Promise of an ICreateUser object, which likely represents the newly created user account.
    async execute(command: CreateUserCommand, resolve: (value?) => void): Promise<ICreateUser> {
        // command: an instance of the CreateUserCommand class, which is likely the command object that contains the data required to create a new user in the system.
        // resolve: a callback function that takes an optional value parameter and returns nothing
        const account = this.publisher.mergeObjectContext(  // The result of the createUser method call is passed to the publisher.mergeObjectContext method, which is likely a method provided by a NestJS library. This method merges the created user account object with the current context, which is likely used for handling the transactional aspect of the operation.
            await this.userRepo.createUser(command.createUsertDto),
        );
        return account;  // Finally, the resulting account object is returned by the execute method, which will be resolved by the calling function or method
    }
}

@CommandHandler(VerificationLinkUserCommand)
export class VerificationLinkUserCommandHandler implements ICommandHandler<VerificationLinkUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: VerificationLinkUserCommand, resolve: (value?) => void): Promise<IVerificationLinkUser> {
        const verificationLink = this.publisher.mergeObjectContext(
            await this.userRepo.sendVerificationLinkUser(command.verificationLinkUserDto),
        );
        return verificationLink;
    }
}

@CommandHandler(ResendForgetPasswordLinkCommand)
export class ResendForgetPasswordLinkUserCommandHandler implements ICommandHandler<ResendForgetPasswordLinkCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: ResendForgetPasswordLinkCommand, resolve: (value?) => void): Promise<IVerificationLinkUser> {
        const resendForgetPasswordLink = this.publisher.mergeObjectContext(
            await this.userRepo.resendForgetPasswordLinkUser(command.resendForgetPasswordLinkUserDto),
        );
        return resendForgetPasswordLink;
    }
}

@CommandHandler(ForgetPasswordCodeUserCommand)
export class ForgetPasswordCodeUserCommandHandler implements ICommandHandler<ForgetPasswordCodeUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: ForgetPasswordCodeUserCommand, resolve: (value?) => void): Promise<IForgetPasswordCodeUser> {
        const forgetPassword = this.publisher.mergeObjectContext(
            await this.userRepo.forgetPasswordCodeUser(command.forgetPasswordCodeUserDto),
        );
        return forgetPassword;
    }
}

@CommandHandler(VerificationCodeUserCommand)
export class VerificationCodeUserCommandHandler implements ICommandHandler<VerificationCodeUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: VerificationCodeUserCommand, resolve: (value?) => void): Promise<IVerificationCodeUser> {
        const verificationCode = this.publisher.mergeObjectContext(
            await this.userRepo.verificationCodeUser(command.verificationCodeUserDto),
        );
        return verificationCode;
    }
}

@CommandHandler(ResetPasswordUserCommand)
export class ResetPasswordUserCommandHandler implements ICommandHandler<ResetPasswordUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: ResetPasswordUserCommand, resolve: (value?) => void): Promise<IResetPasswordUser> {
        const resetPassword = this.publisher.mergeObjectContext(
            await this.userRepo.resetPasswordUser(command.resetPasswordUserDto),
        );
        return resetPassword;
    }
}

@CommandHandler(ChangingPasswordUserCommand)
export class ChangingPasswordUserCommandHandler implements ICommandHandler<ChangingPasswordUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: ChangingPasswordUserCommand, resolve: (value?) => void): Promise<IChangingPasswordUser> {
        const changingPassword = this.publisher.mergeObjectContext(
            await this.userRepo.changingPasswordUser(command.changingPasswordUserDto),
        );
        return changingPassword;
    }
}

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: LoginUserCommand, resolve: (value?) => void): Promise<ILoginUser> {
        const loginUser = this.publisher.mergeObjectContext(
            await this.userRepo.loginUser(command.LoginUserDto),
        );
        return loginUser;
    }
}

@CommandHandler(UpdateProfileUserCommand)
export class UpdateProfileUserCommandHandler implements ICommandHandler<UpdateProfileUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: UpdateProfileUserCommand, resolve: (value?) => void): Promise<IUpdateProfileUser> {
        const updateProfile = this.publisher.mergeObjectContext(
            await this.userRepo.updateProfile(command.updateUserProfileUserDto, command.request),
        );
        return updateProfile;
    }
}

@CommandHandler(AddBusinessesUserCommand)
export class BusinessesUserCommandHandler implements ICommandHandler<AddBusinessesUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: AddBusinessesUserCommand, resolve: (value?) => void): Promise<IAddBusinessUser> {
        const addUserBusiness = this.publisher.mergeObjectContext(
            await this.userRepo.addBusinessesUser(command.addUserBusinessesDto, command.request),
        );
        return addUserBusiness;
    }
}

@CommandHandler(UpdateBusinessesUserCommand)
export class UpdateBusinessesUserCommandHandler implements ICommandHandler<UpdateBusinessesUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: UpdateBusinessesUserCommand, resolve: (value?) => void): Promise<IUpdateBusinessUser> {
        const updateUserBusiness = this.publisher.mergeObjectContext(
            await this.userRepo.updateBusinessesUser(command.updateUserBusinessesDto, command.request),
        );
        return updateUserBusiness;
    }
}

@CommandHandler(DeleteBusinessesUserCommand)
export class DeleteBusinessesUserCommandHandler implements ICommandHandler<DeleteBusinessesUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: DeleteBusinessesUserCommand, resolve: (value?) => void): Promise<IDeleteBusinessUser> {
        const deleteUserBusiness = this.publisher.mergeObjectContext(
            await this.userRepo.deleteBusinessesUser(command.deleteUserBusinessesDto, command.request),
        );
        return deleteUserBusiness;
    }
}


