import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { IResetPasswordUser, ICreateUser, IForgetPasswordCodeUser, ILoginUser, IVerificationLinkUser } from "./interface/res/user.interface";
import { CreateUserCommand } from "./commands/create-user.command";
import { LoginUserCommand } from "./commands/login-user.command";
import { UserRepository } from "./users.repository";
import { VerificationLinkUserCommand } from "./commands/verification-link-user.command";
import { ForgetPasswordCodeUserCommand } from "./commands/forget-password-code-user.command";
import { ResetPasswordUserCommand } from "./commands/changing-password-user.dto";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: CreateUserCommand, resolve: (value?) => void): Promise<ICreateUser> {
        const account = this.publisher.mergeObjectContext(
            await this.userRepo.createUser(command.createUsertDto),
        );
        return account;
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

@CommandHandler(VerificationLinkUserCommand)
export class ResendForgetPasswordLinkUserCommandHandler implements ICommandHandler<VerificationLinkUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: VerificationLinkUserCommand, resolve: (value?) => void): Promise<IVerificationLinkUser> {
        const verificationLink = this.publisher.mergeObjectContext(
            await this.userRepo.resendForgetPasswordLinkUser(command.verificationLinkUserDto),
        );
        return verificationLink;
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


@CommandHandler(ResetPasswordUserCommand)
export class ResetPasswordUserCommandHandler implements ICommandHandler<ResetPasswordUserCommand> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(command: ResetPasswordUserCommand, resolve: (value?) => void): Promise<IResetPasswordUser> {
        const changingPassword = this.publisher.mergeObjectContext(
            await this.userRepo.resetPasswordUser(command.resetPasswordUserDto),
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
        const account = this.publisher.mergeObjectContext(
            await this.userRepo.loginUser(command.LoginUserDto),
        );
        return account;
    }
}
