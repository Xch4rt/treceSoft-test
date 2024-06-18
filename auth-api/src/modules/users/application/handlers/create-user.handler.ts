import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../commands/create-user.command";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { PasswordService } from "src/common/services/password.service";
import { Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { ROL_REPOSITORY } from "src/common/constants/rol.repository";
import { IRolRepository } from "src/modules/roles/domain/repositories/roles.repository";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository, 
                                         private readonly passwordService: PasswordService, 
                @Inject(ROL_REPOSITORY) private readonly roleRepository: IRolRepository) {}

    async execute(command: CreateUserCommand): Promise<any> {
        const { createUserDto } = command;

        const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
        const roleId = parseInt(createUserDto.roleId, 10)
        const role = await this.roleRepository.findById(roleId);

        if (!role) {
            throw new NotFoundException(`Role with ID ${role.id} not found`);
        }

        const user = new User(
            createUserDto.username,
            createUserDto.email,
            createUserDto.name,
            roleId,
            hashedPassword,
        );

        return await this.userRepository.createAsync(user);
    }
    
}