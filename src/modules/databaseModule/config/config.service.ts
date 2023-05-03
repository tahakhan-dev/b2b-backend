import { Injectable } from '@nestjs/common';
import { ConfigData, ConfigDBData } from './config.interface';
import { DEFAULT_CONFIG, DEFAULT_CONFIG_2 } from './config.default';
import 'dotenv/config';

@Injectable()
export class ConfigService {
    private config: ConfigData;
    private config2: ConfigData

    constructor(
        data: ConfigData = DEFAULT_CONFIG,
        data2: ConfigData = DEFAULT_CONFIG_2
    ) {
        this.config = data;
        this.config2 = data2
    }

    public lofusingDotEnv() {
        this.config = this.parseConfigFromEnv(process.env);     //  loading env for 1st Database Creds
        this.config2 = this.parseConfig2FromEnv(process.env)   //   loading env for 2st Database 
    }

    private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {  // parsing config data of database1
        return {
            env: env.NODE_ENV || DEFAULT_CONFIG.env,
            port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
            db: this.parseDbConfigFromEnv(env) || DEFAULT_CONFIG.db,
            logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
        };
    }

    private parseConfig2FromEnv(env: NodeJS.ProcessEnv): ConfigData { // parsing config data of database2
        return {
            env: env.NODE_ENV || DEFAULT_CONFIG_2.env,
            port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG_2.port,
            db: this.parseDbConfig2FromEnv(env) || DEFAULT_CONFIG_2.db,
            logLevel: env.LOG_LEVEL || DEFAULT_CONFIG_2.logLevel,
        };
    }

    private parseDbConfigFromEnv(env: NodeJS.ProcessEnv): ConfigDBData {  // initializing env or config of database1
        return {
            type: env.DB_TYPE || DEFAULT_CONFIG.db.type,
            user: env.DB_USER || DEFAULT_CONFIG.db.user,
            pass: env.DB_PASSWORD || DEFAULT_CONFIG.db.pass,
            name: env.DB_DATABASE || DEFAULT_CONFIG.db.name,
            host: env.DB_HOST || DEFAULT_CONFIG.db.host,
            port: parseInt(env.DB_PORT, 10) || DEFAULT_CONFIG.db.port,
            synchronize: JSON.parse(env.ENABLE_AUTOMATIC_CREATION),
            autoLoadEntities: JSON.parse(env.AUTO_LOAD_ENTITIES) || DEFAULT_CONFIG.db.autoLoadEntities,
            dialect: env.DB_DIALECT || '',
            charset: env.DB_CHARSET || '',
            collate: env.DB_COLLATE || '',
        };
    }

    private parseDbConfig2FromEnv(env: NodeJS.ProcessEnv): ConfigDBData {  // initializing env or config of database2
        return {
            type: env.DB_TYPE_2 || DEFAULT_CONFIG_2.db.type,
            user: env.DB_USER_2 || DEFAULT_CONFIG_2.db.user,
            pass: env.DB_PASSWORD_2 || DEFAULT_CONFIG_2.db.pass,
            name: env.DB_DATABASE_2 || DEFAULT_CONFIG_2.db.name,
            host: env.DB_HOST_2 || DEFAULT_CONFIG_2.db.host,
            port: parseInt(env.DB_PORT_2, 10) || DEFAULT_CONFIG_2.db.port,
            synchronize: JSON.parse(env.ENABLE_AUTOMATIC_CREATION_2) || DEFAULT_CONFIG_2.db.synchronize,
            autoLoadEntities: JSON.parse(env.AUTO_LOAD_ENTITIES_2) || DEFAULT_CONFIG_2.db.autoLoadEntities,
            dialect: env.DB_DIALECT || '',
            charset: env.DB_CHARSET || '',
            collate: env.DB_COLLATE || '',
        };
    }

    public getDatabase1Creds(): Readonly<ConfigData> {
        return this.config
    }

    public getDatabase2Creds(): Readonly<ConfigData> {
        return this.config2
    }
}
