import { UpdateUserDto } from "../dtos/update-user.dto";

export class DeleteUserCommand {
    constructor(
        public readonly userId: number
    ) {}
}