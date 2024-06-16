import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserCommand } from '../../application/commands/login-user.command';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Auth Endpoints')
export class LoginUserController {
    constructor (
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    async loginUser(@Body() loginUserDto: LoginUserDto) : Promise<any> {
        const command = new LoginUserCommand(loginUserDto);

        return this.commandBus.execute(command);
    }
}