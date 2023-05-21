import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { Module } from '@nestjs/common';
import 'dotenv/config';

@Module({
    imports: [
        CacheModule.register({
            // @ts-ignore
            store: async () => await redisStore({
                // Store-specific configuration:
                socket: {
                    host: process.env.REDIS_HOST,
                    port: parseInt(process.env.REDIS_PORT),
                    passphrase: process.env.REDIS_PASSPHRASE,
                },
                ttl: parseInt(process.env.REDIS_TTL)
            })
        }),

    ],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule { }