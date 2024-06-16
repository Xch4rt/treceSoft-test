import { Injectable } from "@nestjs/common";
import { IRolRepository } from "../../domain/repositories/roles.repository";
import { Rol } from "../../domain/entities/rol.entity";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RolRepository implements IRolRepository {

    constructor(private readonly prisma: PrismaService) {}

    async createAsync(rol: Rol): Promise<Rol> {
        const createdRol = await this.prisma.rol.create({
            data: {
                Description: rol.description,
            }
        });

        return new Rol(
            createdRol.Description,
            createdRol.Id,
            createdRol.Status,
            createdRol.CreatedAt
        )
    }
    async findById(id: number): Promise<Rol> {
        const role = await this.prisma.rol.findUnique({
            where: {Status: true, Id: id}
        });

        if (!role) return null;

        return new Rol(
            role.Description,
            role.Id,
            role.Status,
            role.CreatedAt
        )
    }
    async findAll(): Promise<Rol[]> {
        const roles = await this.prisma.rol.findMany({
            where: {Status: true}
        });

        if (!roles) return null;

        return roles.map(
            role => new Rol(
                role.Description,
                role.Id,
                role.Status,
                role.CreatedAt
            )
        )
    }
    async delete(id: number): Promise<void> {
        const deletedRole = await this.prisma.rol.update({
            where: {
                Id: id
            },
            data: {
                Status: false
            }
        });

        if (!deletedRole) return null;
    }
}