import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        // forwardRef(() => UsersModule),
        // JwtModule.registerAsync({
        //     useFactory: async () => ({
        //         secret: 'hard_to_guess_secret_123',
        //         signOptions: { expiresIn: '1d' }
        //     })
        // })
    ],
    providers: [AuthService
        // , RolesGuard, JwtAuthGuard, JwtStrategy
    ],
    exports: [AuthService]
})
export class AuthModule { }