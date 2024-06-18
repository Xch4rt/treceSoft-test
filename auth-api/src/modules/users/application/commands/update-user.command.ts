import { UpdateUserDto } from "../dtos/update-user.dto";

export class UpdateUserCommand {
    constructor(
        public readonly userId: number,
        public readonly updateUserDto: UpdateUserDto
    ) {}
}