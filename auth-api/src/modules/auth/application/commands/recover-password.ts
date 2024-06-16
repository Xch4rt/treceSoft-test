import { LoginUserDto } from "../dtos/login-user.dto";

export class RecoverPasswordCommand {
    constructor(public readonly email: string) {}
}