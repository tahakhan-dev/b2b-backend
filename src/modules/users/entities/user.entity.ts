import { UserSignUpType } from "src/common/enums/signup-type";
import { BaseEntity } from "src/entitiesList/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { UserRole } from "src/common/enums/user-role";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ name: 'user_name', nullable: false, unique: true })
    userName: string;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'email', nullable: false, unique: true })
    email: string;
 
    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'role', type: 'enum', enum: UserRole, default: UserRole.BUYER, nullable: false })
    role: UserRole;

    @Column({ name: 'signup_type', type: 'enum', enum: UserSignUpType, default: UserSignUpType.CUSTOM, nullable: false })
    signUpType: UserSignUpType;

    @Column({ name: 'email_verified', default: false, nullable: true })
    emailVerified: boolean;

    @Column({ name: 'opt_verification', default: true, nullable: true })
    optVerification: boolean;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ name: 'profile_image', nullable: true })
    profileImage: string;

    @Column({ name: 'is_block', default: false, nullable: true })
    isBlock: boolean;

    @Column({ name: 'is_deleted', default: false, nullable: true })
    isDeleted: boolean;

    // @BeforeInsert()
    // emailToLowerCase() {
    //     this.email = this.email.toLowerCase();
    // }
    token: string;


    @BeforeInsert()
    @BeforeUpdate()
    trimFields() {
        this.email = this.email.toLowerCase().toString().replace(/\s/g, '');
        this.userName = this.userName.toLowerCase().toString().replace(/\s/g, '');
    }
}

