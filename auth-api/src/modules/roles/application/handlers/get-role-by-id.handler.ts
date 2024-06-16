import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRoleByIdQuery } from "../queries/get-role-by-id.query";
import { IRolRepository } from "../../domain/repositories/roles.repository";
import { Rol } from "../../domain/entities/rol.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { ROL_REPOSITORY } from "src/common/constants/rol.repository";


@QueryHandler(GetRoleByIdQuery)
export class GetRoleByIdHandler implements IQueryHandler<GetRoleByIdQuery> {

    constructor(@Inject(ROL_REPOSITORY) private readonly roleRepository: IRolRepository) {}

    async execute(query: GetRoleByIdQuery): Promise<any> {
        const { roleId } = query;

        const role = await this.roleRepository.findById(roleId);

        if (!role) {
            throw new NotFoundException(`Role with ID ${roleId} not found`);
        }

        return role;
    }
    
}
