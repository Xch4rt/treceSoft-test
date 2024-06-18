import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../commands/update-user.command";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { PasswordService } from "src/common/services/password.service";
import { Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { ROL_REPOSITORY } from "src/common/constants/rol.repository";
import { IRolRepository } from "src/modules/roles/domain/repositories/roles.repository";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    async execute(command: UpdateUserCommand): Promise<any> {
        const { updateUserDto, userId } = command;

    

        const user = new User(
            updateUserDto.username,
            updateUserDto.email,
            updateUserDto.name,
            updateUserDto.roleId,
        );

        return await this.userRepository.update(userId, user);
    }
    
}