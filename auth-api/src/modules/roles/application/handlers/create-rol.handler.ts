import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRolCommand } from "../commands/create-rol.command";
import { IRolRepository } from "../../domain/repositories/roles.repository";
import { Rol } from "../../domain/entities/rol.entity";
import { Inject } from "@nestjs/common";
import { ROL_REPOSITORY } from "src/common/constants/rol.repository";

@CommandHandler(CreateRolCommand)
export class CreateRolHandler implements ICommandHandler<CreateRolCommand> {
    
    constructor(@Inject(ROL_REPOSITORY) private readonly rolRepository: IRolRepository) {}
    
    async execute(command: CreateRolCommand): Promise<any> {
        const {createRoleDto} = command;
    
        const rol = new Rol(
            createRoleDto.description
        );

        return await this.rolRepository.createAsync(rol);
    }
    
}