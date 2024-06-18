import { Body, Controller, Post, Get, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAllUsersQuery } from '../../application/queries/get-all-users.query';
import { GetUserByIdQuery } from '../../application/queries/get-user-by-id.query';
import { GetUserByUsernameQuery } from '../../application/queries/get-user-by-username.query';
import { GetUserByEmailQuery } from '../../application/queries/get-user-by-email.query';
import { JwtAuthGuard } from 'src/modules/auth/infraestructure/guards/jwt-auth.guard';
import { RoleGuard } from 'src/modules/auth/infraestructure/guards/roles.guard';
import { Roles } from 'src/modules/auth/infraestructure/decorators/roles.decorator';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@Controller('users')
@ApiTags('Users Endpoints')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('SuperAdmin')
    async createUser(@Body() createUserDto: CreateUserDto) : Promise<any> {
        
        const command = new CreateUserCommand(createUserDto);

        return this.commandBus.execute(command);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('SuperAdmin')
    async getAllUsers() : Promise<any[]> {
        return this.queryBus.execute(new GetAllUsersQuery());
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('SuperAdmin', 'Generico1')
    async getUserById(@Param('id') id: string) : Promise<any> {
        const userId = parseInt(id, 10);

        return this.queryBus.execute(new GetUserByIdQuery(userId));
    }

    @Get(':username')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('SuperAdmin')
    async getUserByUsername(@Param('username') username: string) : Promise<any> {
        return this.queryBus.execute(new GetUserByUsernameQuery(username));
    }

    @Get(':email')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('SuperAdmin')
    async getUserByEmail(@Param('email') email: string) : Promise<any> {
        return this.queryBus.execute(new GetUserByEmailQuery(email));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('SuperAdmin')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const userId = parseInt(id, 10);

        return this.commandBus.execute(new UpdateUserCommand(userId, updateUserDto));
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('SuperAdmin')
    async delete(@Param('id') id: string) {
        const userId = parseInt(id, 10);

        return this.commandBus.execute(new DeleteUserCommand(userId));
    }
}