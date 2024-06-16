import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { RolRepository } from './infrastructure/repositories/roles.repository';
import { ROL_REPOSITORY } from 'src/common/constants/rol.repository';
import { CreateRolHandler } from './application/handlers/create-rol.handler';
import { RolController } from './presentation/controllers/rol.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [CqrsModule, CommonModule],
    controllers: [RolController],
    providers: [
        PrismaService,
        {
            provide: ROL_REPOSITORY,
            useClass: RolRepository
        },
        CreateRolHandler
    ],
})
export class RolesModule {}