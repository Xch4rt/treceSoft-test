import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRolCommand } from '../../application/commands/create-rol.command';
import { CreateRolDto } from '../dtos/create-rol.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles Endpoints')
export class RolController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    async createRol(@Body() createRolDto: CreateRolDto) : Promise<any> {

        const command = new CreateRolCommand(createRolDto);

        return this.commandBus.execute(command);
    }
}