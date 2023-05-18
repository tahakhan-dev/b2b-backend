import { BaseEntity } from "src/entitiesList/base.entity";
import { UserBusinessesEntity } from "src/modules/users/entities/user-businesses.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity({ name: 'business_type_category' })

export class BusinessTypeCategoryEntity extends BaseEntity {
    @Column({ name: 'name', nullable: false })
    name: string;

    @OneToMany(() => UserBusinessesEntity, (userBusinesses) => userBusinesses.businessType)
    userBusinesses: UserBusinessesEntity[];

}

