import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserCommand } from '../../application/commands/login-user.command';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { RecoverPasswordCommand } from '../../application/commands/recover-password';

@Controller('auth')
@ApiTags('Auth Endpoints')
export class AuthController {
    constructor (
        private readonly commandBus: CommandBus
    ) {}

    @Post()
    async loginUser(@Body() loginUserDto: LoginUserDto) : Promise<any> {
        const command = new LoginUserCommand(loginUserDto);

        return this.commandBus.execute(command);
    }

    @Post('recover-password')
    async recoverPassword(@Body('email') email: string) : Promise<any>{
        const command = new RecoverPasswordCommand(email);
        console.log(command);
        return this.commandBus.execute(command);
    }
}