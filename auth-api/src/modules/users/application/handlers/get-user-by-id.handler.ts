import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { GetUserByIdQuery } from "../queries/get-user-by-id.query";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

    async execute(query: GetUserByIdQuery): Promise<any> {
        const { userId } = query;

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return user;
    }
    
}