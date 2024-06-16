import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRolCommand } from '../../application/commands/create-rol.command';
import { CreateRolDto } from '../dtos/create-rol.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAllRolesQuery } from '../../application/queries/get-all-roles.query';
import { Rol } from '../../domain/entities/rol.entity';
import { GetRoleByIdQuery } from '../../application/queries/get-role-by-id.query';
import { JwtAuthGuard } from 'src/modules/auth/infraestructure/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
@ApiTags('Roles Endpoints')
export class RolController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createRol(@Body() createRolDto: CreateRolDto) : Promise<any> {

        const command = new CreateRolCommand(createRolDto);

        return this.commandBus.execute(command);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllRoles(): Promise<Rol[]> {
        return this.queryBus.execute(new GetAllRolesQuery());
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getRolById(@Param('id') id: string) : Promise<Rol> {
        const roleId = parseInt(id, 10);

        return this.queryBus.execute(new GetRoleByIdQuery(roleId));
    }
}