import { BaseEntity } from "src/entitiesList/base.entity";
import { Column, Entity } from "typeorm";


@Entity({ name: 'business_type_category' })
export class BusinessTypeCategoryEntity extends BaseEntity {
    @Column({ name: 'name', nullable: false })
    name: string;

}

