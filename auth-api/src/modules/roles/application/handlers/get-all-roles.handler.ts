import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllRolesQuery } from "../queries/get-all-roles.query";
import { IRolRepository } from "../../domain/repositories/roles.repository";
import { Rol } from "../../domain/entities/rol.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { ROL_REPOSITORY } from "src/common/constants/rol.repository";

@QueryHandler(GetAllRolesQuery)
export class GetAllRolesHandler implements IQueryHandler<GetAllRolesQuery> {

    constructor(@Inject(ROL_REPOSITORY) private readonly roleRepository: IRolRepository) {}

    async execute(query: GetAllRolesQuery): Promise<Rol[]> {
        return await this.roleRepository.findAll();
    }
}