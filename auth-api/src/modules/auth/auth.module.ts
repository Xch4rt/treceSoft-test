import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from './infraestructure/prisma/prisma.service';
import { AuthRepository } from './infraestructure/repositories/auth.repository';
import { AUTH_REPOSITORY } from 'src/common/constants/auth.repository';
import { LoginUserHandler } from './application/handlers/login-user.handler';
import { LoginUserController } from './presentation/controllers/login.controller';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infraestructure/guards/jwt-auth.guard';

@Module({
  imports: [
    CqrsModule, 
    CommonModule, 
    UsersModule,
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
  controllers: [LoginUserController],
  providers: [
    PrismaService,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    LoginUserHandler,
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [AUTH_REPOSITORY, JwtAuthGuard]
})
export class AuthModule {}
