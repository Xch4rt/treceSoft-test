import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "../commands/delete-user.command";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { PasswordService } from "src/common/services/password.service";
import { Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { ROL_REPOSITORY } from "src/common/constants/rol.repository";
import { IRolRepository } from "src/modules/roles/domain/repositories/roles.repository";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    async execute(command: DeleteUserCommand): Promise<any> {
        const { userId } = command;

        return await this.userRepository.delete(userId);
    }
    
}