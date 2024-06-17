import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RecoverPasswordCommand } from "../commands/recover-password";
import { Inject, NotFoundException } from '@nestjs/common'
import { IUserRepository } from "src/modules/users/domain/repositories/user.repository";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { MailService } from "src/common/services/mail.service";
import { PasswordResetRepository } from "../../infraestructure/repositories/password-reset.repository";
import {v4 as uuidv4 } from 'uuid';
import { IPasswordResetRepository } from "../../domain/repositories/password-reset.repository";

@CommandHandler(RecoverPasswordCommand) 
export class RecoverPasswordHandler implements ICommandHandler<RecoverPasswordCommand> {

    constructor (
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
                                 private readonly mailService: MailService,
                                 private readonly passwordResetRepository: PasswordResetRepository
    ){}

    async execute(command: RecoverPasswordCommand): Promise<any> {
        const { email } = command;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const resetToken = uuidv4();

        await this.passwordResetRepository.savePasswordResetToken(user.id, resetToken);

        await this.mailService.sendMail(
            email,
            'Password Reset',
            `To reset your password, please use the following token: ${resetToken}`
        );
    }
    
}