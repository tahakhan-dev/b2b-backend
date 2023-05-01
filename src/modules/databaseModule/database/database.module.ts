import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigDBData } from '../config/config.interface';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DbConfig } from './db.interface';
import { DbConfigError } from './db.error';

@Module({})
export class DatabaseModule {
    static forRoot(dbconfig: DbConfig): DynamicModule {
        return {
            global: true,
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) =>
                        DatabaseModule.getConnectionOptions(configService, dbconfig),
                    inject: [ConfigService],
                }),
            ],
        };
    }

    public static getConnectionOptions(config: ConfigService, dbconfig: DbConfig): TypeOrmModuleOptions {
        const dbdata = config.get().db;
        let connectionOptions: TypeOrmModuleOptions;

        if (!dbdata) {
            throw new DbConfigError('Database config is missing');
        }
        connectionOptions = this.getConnectionOptionsDatabase(dbdata);

        return {
            ...connectionOptions,
            entities: dbconfig.entities,
            logging: true,
            extra: {
                "validateConnection": false,
                "trustServerCertificate": true
            }
        };
    }


    private static getConnectionOptionsDatabase(dbdata: ConfigDBData): TypeOrmModuleOptions {
        return {
            type: process.env.DB_TYPE || dbdata.type,
            host: process.env.DB_HOST || dbdata.host,
            port: +process.env.DB_PORT || dbdata.port,
            username: process.env.DB_USER || dbdata.user,
            password: process.env.DB_PASSWORD || dbdata.pass,
            database: process.env.DB_DATABASE || dbdata.name,
            synchronize: JSON.parse(process.env.ENABLE_AUTOMATIC_CREATION) || dbdata.synchronize,
        };
    }
}
