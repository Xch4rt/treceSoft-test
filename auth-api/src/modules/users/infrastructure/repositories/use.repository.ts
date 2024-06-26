import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(private readonly prisma: PrismaService) {}

    async update(id: number, user: Partial<User>): Promise<User> {
        const findUser = await this.prisma.user.findUnique({
            where: {
                Id: id
            }
        });

        if (!findUser) {
            throw new NotFoundException('User not found');
        }

        const { username, email, name, roleId } = user;

        const updatedUser = await this.prisma.user.update({
            where: {
                Id: id
            }, data: {
                Username: username,
                Email: email,
                Name: name,
                RoleId: roleId
            }
        });

        return new User(
            updatedUser.Username,
            updatedUser.Email,
            updatedUser.Name,
            updatedUser.RoleId,
        )
    }

    async createAsync(user: User): Promise<User> {
        const createdUser = await this.prisma.user.create({
            data: {
                Name: user.name,
                Email: user.email,
                Password: user.password,
                Username: user.username,
                RoleId: user.roleId
            }
        });

        return new User(
            createdUser.Username,
            createdUser.Email,
            createdUser.Name,
            createdUser.RoleId,
            createdUser.Password,
        )
    }
    async findById(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {Id: id, Status: true},
            include: {
                Role: true
            }
        });

        if (!user) return null;

        return new User(
            user.Username,
            user.Email,
            user.Name,
            user.RoleId,
            user.Password,
            user.Role.Description,
            user.Id,
            user.Status,
            user.CreatedAt
        )
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {Username: username, Status: true},
            include: {
                Role: true
            }
        });

        if (!user) return null;

        return new User(
            user.Username,
            user.Email,
            user.Name,
            user.RoleId,
            user.Password,
            user.Role.Description,
            user.Id,
            user.Status,
            user.CreatedAt
        )
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {Email: email, Status: true},
            include: {
                Role: true
            }
        });

        if (!user) return null;

        return new User(
            user.Username,
            user.Email,
            user.Name,
            user.RoleId,
            user.Password,
            user.Role.Description,
            user.Id,
            user.Status,
            user.CreatedAt
        )
    }
    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            where: {Status: true},
            include: {
                Role: true
            }
        });

        if (!users) return null;

        return users.map(
            user => new User(
                user.Username,
                user.Email,
                user.Name,
                user.RoleId,
                user.Password,
                user.Role.Description,
                user.Id,
                user.Status,
                user.CreatedAt
            )
        )
    }
    async delete(id: number): Promise<void> {
        const deletedUser = await this.prisma.user.update({
            where: {
                Id: id
            },
            data: {
                Status: false
            }
        });

        if (!deletedUser) return null;
    }
    
}