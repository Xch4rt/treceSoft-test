import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUsersQuery } from "../queries/get-all-users.query";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { Inject } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository : IUserRepository) {}
    
    
    async execute(query: GetAllUsersQuery): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}