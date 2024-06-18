import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RecoverPasswordCommand } from "../commands/recover-password";
import { Inject, NotFoundException } from '@nestjs/common'
import { IUserRepository } from "src/modules/users/domain/repositories/user.repository";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { MailService } from "src/common/services/mail.service";
import { PasswordResetRepository } from "../../infraestructure/repositories/password-reset.repository";
import {v4 as uuidv4 } from 'uuid';
import { IPasswordResetRepository } from "../../domain/repositories/password-reset.repository";
import { ResetPasswordCommand } from "../commands/reset-password";

@CommandHandler(ResetPasswordCommand) 
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand> {

    constructor (
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
                                 private readonly passwordResetRepository: PasswordResetRepository
    ){}

    async execute(command: ResetPasswordCommand): Promise<any> {
        const { resetPasswordDto } = command;

        await this.passwordResetRepository.resetPassword(resetPasswordDto.userId, resetPasswordDto.password, resetPasswordDto.token);
    }
    
}