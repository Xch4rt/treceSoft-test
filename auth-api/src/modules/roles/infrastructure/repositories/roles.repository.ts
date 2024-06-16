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
    findById(id: number): Promise<Rol> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Rol[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}