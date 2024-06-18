import { User } from '../entities/user.entity';

export interface IUserRepository {
    createAsync (user: User) : Promise<User>;
    findById (id: number) : Promise<User>;
    findByUsername (username: string) : Promise<User | null>;
    findByEmail (email: string) : Promise<User | null>;
    findAll(): Promise<User[]>;
    delete(id: number) : Promise<void>;
    update(id: number, user: User) : Promise<User>;
}