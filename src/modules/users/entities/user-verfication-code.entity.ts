import { BaseEntity } from "src/entitiesList/base.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { UserSignUpType } from "src/common/enums/signup-type";
import { UserRole } from "src/common/enums/user-role";
import { Exclude } from "class-transformer";

@Entity({ name: 'users_verification_code' })
export class UserVerificationCodeEntity extends BaseEntity {
    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'verfication_code', nullable: false })
    verificationCode: number;

    @Column({ name: 'token_creation_date', nullable: false })
    token_creation_date: string;

}

