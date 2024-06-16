import { CreateRolDto } from "../dtos/create-rol.dto";
export class CreateRolCommand {
    constructor (
        public readonly createRoleDto: CreateRolDto
    ) {}
}