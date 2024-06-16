import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users Endpoints')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) : Promise<any> {
        const { username, password, email, name } = createUserDto;
        
        const command = new CreateUserCommand(createUserDto);

        return this.commandBus.execute(command);
    }
}