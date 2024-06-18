import { RecoverPasswordDto } from "../dtos/recover-password.dto";

export class RecoverPasswordCommand {
    constructor(public readonly recoverPasswordDto: RecoverPasswordDto) {}
}