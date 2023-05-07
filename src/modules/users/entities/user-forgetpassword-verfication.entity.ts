import { BaseEntity } from "src/entitiesList/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'users_forgetpassword_code' })
export class UserForgetPasswordCodeEntity extends BaseEntity {
    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'verfication_code', nullable: false })
    verificationCode: number;

    @Column({ name: 'token_creation_date', nullable: false })
    token_creation_date: string;

}

