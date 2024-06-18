import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { PrismaService } from "../prisma/prisma.service";
import { IUserRepository } from "src/modules/users/domain/repositories/user.repository";
import { PasswordService } from "src/common/services/password.service";
import { USER_REPOSITORY } from "src/common/constants/user.repository";
import { JwtService } from "@nestjs/jwt";
import { IPasswordResetRepository } from "../../domain/repositories/password-reset.repository";

@Injectable()
export class PasswordResetRepository implements IPasswordResetRepository {

    constructor (private readonly prisma: PrismaService, private readonly passwordService: PasswordService) {}
    
    async resetPassword(userId: number, password: string, token: string): Promise<any> {
        const isTokenValid = await this.prisma.token.findFirst({
            where: {
                ResetToken: token
            }
        });

        const now = new Date();

        if (!isTokenValid && now > isTokenValid.ResetTokenExpiry) {
            throw new UnauthorizedException('Token is not valid');
        }
        const newPasswordHashed = await this.passwordService.hashPassword(password);

        const updatedPassword = await this.prisma.user.update({
            where: {
                Id: userId
            }, 
            data: {
                Password : newPasswordHashed
            }
        });

    }

    async savePasswordResetToken(userId: number, resetToken: string): Promise<any> {
        const expiryDate = new Date();

        expiryDate.setHours(expiryDate.getHours() + 1);
    
        await this.prisma.token.create({
            data: {
                UserId: userId,
                ResetToken: resetToken,
                ResetTokenExpiry: expiryDate
            }
        })
    }
}