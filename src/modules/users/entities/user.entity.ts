import { BaseEntity } from "src/entitiesList/base.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";
import { Exclude } from "class-transformer";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ name: 'user_name', nullable: false, unique: true })
    userName: string;

    @Column({ name: 'first_name', nullable: true })
    firstName: number;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'email', nullable: false, unique: true })
    email: string;

    @Exclude()
    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'role', default: 'user', nullable: false })
    role: UserRole;

    @Column({ name: 'signup_type', default: 'custom', nullable: false })
    signUpType: UserSignUpType;

    @Column({ name: 'email_verification', default: false, nullable: false })
    emailVerification: boolean;

    @Column({ name: 'opt_verification', default: false, nullable: true })
    optVerification: boolean;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ name: 'is_active', nullable: true, default: true })
    isActive: boolean;

    @Column({ name: 'is_block', nullable: true, default: false })
    isBlock: boolean;

    @Column({ name: 'is_deleted', nullable: true, default: false })
    isDeleted: boolean;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}

