import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { GetUserByIdQuery } from "../queries/get-user-by-id.query";
import { GetUserByUsernameQuery } from "../queries/get-user-by-username.query";

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler implements IQueryHandler<GetUserByUsernameQuery> {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) { }

    async execute(query: GetUserByUsernameQuery): Promise<any> {
        const { username } = query;

        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            throw new NotFoundException(`User with USERNAME ${username} not found`);
        }

        return user;
    }

}