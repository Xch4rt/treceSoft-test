import { ResetPasswordDto } from "../dtos/reset-password.dto";

export class ResetPasswordCommand {
    constructor(public readonly resetPasswordDto: ResetPasswordDto) {}
}