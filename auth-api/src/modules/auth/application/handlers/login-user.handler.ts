import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginUserCommand } from "../commands/login-user.command";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { Inject, NotFoundException } from "@nestjs/common";
import { AUTH_REPOSITORY } from "src/common/constants/auth.repository";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {

    constructor(
        @Inject(AUTH_REPOSITORY) private readonly authRepository: IAuthRepository
    ) {}

    async execute(command: LoginUserCommand): Promise<any> {
        const { loginUserDto } = command;

        const user = await this.authRepository.login(loginUserDto.username, loginUserDto.password);

        if (!user) {
            throw new NotFoundException('Invalid Credentials');
        }

        return user;
    }
    
}