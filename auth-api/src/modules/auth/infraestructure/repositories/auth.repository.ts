import { Inject, Injectable } from "@nestjs/common";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { PrismaService } from "../prisma/prisma.service";
import { IUserRepository } from "src/modules/users/domain/repositories/user.repository";
import { PasswordService } from "src/common/services/password.service";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository implements IAuthRepository {

    constructor (@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
                                          private readonly passwordService: PasswordService,
                                          private readonly jwtService: JwtService) {}

    async login(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) return null;

        const passwordMath = await this.passwordService.verifyPassword(password, user.password);

        if (!passwordMath) return null;

        const payload = { username: user.username, sub: user.id, role: user.role}

        return {
            user: user,
            access_token: this.jwtService.sign(payload)
        };
    }
    
}