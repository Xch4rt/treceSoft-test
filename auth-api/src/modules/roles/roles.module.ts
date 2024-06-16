import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { RolRepository } from './infrastructure/repositories/roles.repository';
import { IRolRepository } from './domain/repositories/roles.repository';
import { ROL_REPOSITORY } from 'src/common/constants/rol.repository';
import { CreateRolHandler } from './application/handlers/create-rol.handler';
import { RolController } from './presentation/controllers/rol.controller';
import { CommonModule } from 'src/common/common.module';
import { GetRoleByIdHandler } from './application/handlers/get-role-by-id.handler';
import { GetAllRolesHandler } from './application/handlers/get-all-roles.handler';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [CqrsModule, CommonModule],
    controllers: [RolController],
    providers: [
        PrismaService,
        {
            provide: ROL_REPOSITORY,
            useClass: RolRepository
        },
        CreateRolHandler,
        GetRoleByIdHandler,
        GetAllRolesHandler
    ],
    exports: [ROL_REPOSITORY]
})
export class RolesModule {}