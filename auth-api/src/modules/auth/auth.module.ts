import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from './infraestructure/prisma/prisma.service';
import { AuthRepository } from './infraestructure/repositories/auth.repository';
import { AUTH_REPOSITORY } from 'src/common/constants/auth.repository';
import { LoginUserHandler } from './application/handlers/login-user.handler';
import { AuthController } from './presentation/controllers/auth.controller';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infraestructure/guards/jwt-auth.guard';
import { RecoverPasswordHandler } from './application/handlers/recover-password.handler';
import { PasswordResetRepository } from './infraestructure/repositories/password-reset.repository';
import { RolesModule } from '../roles/roles.module';
import { ResetPasswordHandler } from './application/handlers/reset-password.handler';

@Module({
  imports: [
    CqrsModule, 
    CommonModule, 
    UsersModule,
    RolesModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '60m'
        }
      }),
      inject: [ConfigService]
    })],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    LoginUserHandler,
    RecoverPasswordHandler,
    ResetPasswordHandler,
    PasswordResetRepository,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AUTH_REPOSITORY, JwtAuthGuard]
})
export class AuthModule {}
