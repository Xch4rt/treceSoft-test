import { Rol } from "../entities/rol.entity";

export interface IRolRepository {
    createAsync (rol: Rol) : Promise<Rol>;
    findById(id: number) : Promise<Rol>;
    findAll() : Promise<Rol[]>;
    delete(id: number) : Promise<void>; 
}