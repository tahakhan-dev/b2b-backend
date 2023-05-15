import { BusinessTypeCategoryEntity } from "src/modules/category/entities/business-type-category.entity";
import { BaseEntity } from "src/entitiesList/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity({ name: 'user_businesses' })
export class UserBusinessesEntity extends BaseEntity {
    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @ManyToOne(() => BusinessTypeCategoryEntity, { eager: true })
    @JoinColumn({ name: 'business_type_id' })
    businessType: BusinessTypeCategoryEntity;

    @Column({ name: 'business_name', nullable: false })
    businessName: string;

    @Column({ name: 'business_contact_information', nullable: true })
    businessContactInfromation: string;

    @Column({ name: 'business_description', nullable: true })
    businessDescription: string;

    @Column({ name: 'business_locations', nullable: true })
    businessLocations: string;

    @Column({ name: 'headquarters', nullable: true })
    headquarters: string;

    @Column({ name: 'business_email', nullable: true })
    businessEmail: string;

    @Column({ name: 'business_phone_number', nullable: true })
    businessPhoneNumber: string;

    @Column({ name: 'sys_id', nullable: false, default: false })
    sysId: boolean;

}

