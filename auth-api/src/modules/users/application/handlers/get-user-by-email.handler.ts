import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { GetUserByIdQuery } from "../queries/get-user-by-id.query";
import { GetUserByEmailQuery } from "../queries/get-user-by-email.query";

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {

    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) { }

    async execute(query: GetUserByEmailQuery): Promise<any> {
        const { email } = query;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundException(`User with EMAIL ${email} not found`);
        }

        return user;
    }

}