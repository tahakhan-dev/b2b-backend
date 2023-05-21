import { UserEntity } from '../users/entities/user.entity';
import { JwtStrategy } from './guards/jwt-strategy';
import { RedisModule } from '../redis/redis.module';
import { JwtAuthGuard } from './guards/jwt-guard';
import { RolesGuard } from './guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '3d' }
            })
        }),
        TypeOrmModule.forFeature([UserEntity], process.env.CONNECTION_NAME_2),
        RedisModule,

    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }