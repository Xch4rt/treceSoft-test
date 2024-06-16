import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { UserRepository } from './infrastructure/repositories/use.repository';
import { USER_REPOSITORY } from 'src/common/constants/user.repository';
import { CreateUserHandler } from './application/handlers/create-user.handler';
import { UserController } from './presentation/controllers/user.controller';
import { CommonModule } from 'src/common/common.module';
import { RolesModule } from '../roles/roles.module';
import { ROL_REPOSITORY } from 'src/common/constants/rol.repository';

@Module({
  imports: [CqrsModule, CommonModule, RolesModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    CreateUserHandler,
  ],
})
export class UsersModule {}
