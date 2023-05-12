import { Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

export class BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true }) // unsigned option set to true, which ensures that the generated values are always positive
    id: number;


    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @Column({ name: 'is_deleted', type: 'boolean', default: false })
    isDeleted: boolean;

    @Column({ name: 'server_created_on', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    serverCreatedOn: Date;

    @Column({ name: 'server_updated_on', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    serverUpdatedOn: Date;


    @BeforeUpdate()
    updateTimestamp() {
        this.serverUpdatedOn = new Date();
    }
}
