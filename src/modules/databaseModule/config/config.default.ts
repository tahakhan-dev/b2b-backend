import { ConfigData } from './config.interface';
import 'dotenv/config';

const userName = process.env.DB_USER;
const Pass = process.env.DB_PASSWORD;
const Host = process.env.DB_HOST;
const dbName = process.env.DB_DATABASE;
const dbType = process.env.DB_TYPE;
const dbPort = process.env.DB_PORT;
const enable_db_creation = JSON.parse(process.env.ENABLE_AUTOMATIC_CREATION);
const auto_load_entities = JSON.parse(process.env.AUTO_LOAD_ENTITIES);

const userName2 = process.env.DB_USER_2;
const Pass2 = process.env.DB_PASSWORD_2;
const Host2 = process.env.DB_HOST_2;
const dbName2 = process.env.DB_DATABASE_2;
const dbType2 = process.env.DB_TYPE_2;
const dbPort2 = process.env.DB_PORT_2;
const enable_db_creation2 = JSON.parse(process.env.ENABLE_AUTOMATIC_CREATION_2);
const auto_load_entities_2 = JSON.parse(process.env.AUTO_LOAD_ENTITIES_2);

export const DEFAULT_CONFIG: ConfigData = {
    env: 'DEVELOPMENT',
    db: {
        type: dbType,
        host: Host,
        name: dbName,
        user: userName,
        pass: Pass,
        port: +dbPort,
        synchronize: enable_db_creation,
        autoLoadEntities: auto_load_entities

    },
    logLevel: 'info',
};

export const DEFAULT_CONFIG_2: ConfigData = {
    env: 'DEVELOPMENT',
    db: {
        type: dbType2,
        host: Host2,
        name: dbName2,
        user: userName2,
        pass: Pass2,
        port: +dbPort2,
        synchronize: enable_db_creation2,
        autoLoadEntities: auto_load_entities_2
    },
    logLevel: 'info',
};


