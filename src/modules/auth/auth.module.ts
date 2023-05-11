import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: 'hard_to_guess_secret_123',
                signOptions: { expiresIn: '1d' }
            })
        }),
        TypeOrmModule.forFeature([UserEntity], process.env.CONNECTION_NAME_2),

    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }