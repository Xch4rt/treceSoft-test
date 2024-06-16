import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../commands/create-user.command";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { PasswordService } from "src/common/services/password.service";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository, private readonly passwordService: PasswordService) {}

    async execute(command: CreateUserCommand): Promise<any> {
        const { createUserDto } = command;

        const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);

        const user = new User(
            createUserDto.username,
            createUserDto.email,
            createUserDto.name,
            hashedPassword,
        );

        return await this.userRepository.createAsync(user);
    }
    
}