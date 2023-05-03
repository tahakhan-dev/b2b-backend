import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigDBData } from '../config/config.interface';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DbConfig } from './db.interface';
import { DbConfigError } from './db.error';
import 'dotenv/config';

@Module({})
export class DatabaseModule {
    static forRoot(dbconfig: DbConfig): DynamicModule {
        return {
            global: true,
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => DatabaseModule.getConnectionOptionsDB1(configService, dbconfig),
                    inject: [ConfigService],
                }),
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    name: process.env.CONNECTION_NAME_2,
                    useFactory: async (configService: ConfigService) => DatabaseModule.getConnectionOptionsDB2(configService, dbconfig),
                    inject: [ConfigService],
                }),
            ],
        };
    }

    public static getConnectionOptionsDB1(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
        const dbdata = config.getDatabase1Creds().db;
        let connectionOptions: TypeOrmModuleOptions;

        if (!dbdata) {
            throw new DbConfigError('Database config is missing');
        }
        connectionOptions = this.getConnectionOptionsDatabase1(dbdata);

        return {
            ...connectionOptions,
            entities: dbconfig.entities,
            logging: true,
            // extra: {
            //     "validateConnection": false,
            //     "trustServerCertificate": true // these options are will be included if you are using SSL Certificate thing
            // }
        };
    }

    public static getConnectionOptionsDB2(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
        const dbdata = config.getDatabase2Creds().db;
        let connectionOptions: TypeOrmModuleOptions;

        if (!dbdata) {
            throw new DbConfigError('Database config is missing');
        }
        connectionOptions = this.getConnectionOptionsDatabase2(dbdata);

        return {
            ...connectionOptions,
            entities: dbconfig.entities,
            logging: true,
            name: process.env.CONNECTION_NAME_2,
            // extra: {
            //     "validateConnection": false,
            //     "trustServerCertificate": true  // these options are will be included if you are using SSL Certificate thing
            // }
        };
    }


    private static getConnectionOptionsDatabase1(dbdata: ConfigDBData): TypeOrmModuleOptions {
        return {
            type: process.env.DB_TYPE || dbdata.type,
            host: process.env.DB_HOST || dbdata.host,
            port: +process.env.DB_PORT || dbdata.port,
            username: process.env.DB_USER || dbdata.user,
            password: process.env.DB_PASSWORD || dbdata.pass,
            database: process.env.DB_DATABASE || dbdata.name,
            synchronize: JSON.parse(process.env.ENABLE_AUTOMATIC_CREATION) || dbdata.synchronize,
            autoLoadEntities: JSON.parse(process.env.AUTO_LOAD_ENTITIES) || dbdata.autoLoadEntities
        };
    }

    private static getConnectionOptionsDatabase2(dbdata: ConfigDBData): TypeOrmModuleOptions {
        return {
            type: process.env.DB_TYPE_2 || dbdata.type,
            host: process.env.DB_HOST_2 || dbdata.host,
            port: +process.env.DB_PORT_2 || dbdata.port,
            username: process.env.DB_USER_2 || dbdata.user,
            password: process.env.DB_PASSWORD_2 || dbdata.pass,
            database: process.env.DB_DATABASE_2 || dbdata.name,
            synchronize: JSON.parse(process.env.ENABLE_AUTOMATIC_CREATION_2) || dbdata.synchronize,
            autoLoadEntities: JSON.parse(process.env.AUTO_LOAD_ENTITIES_2) || dbdata.autoLoadEntities
        };
    }

}
