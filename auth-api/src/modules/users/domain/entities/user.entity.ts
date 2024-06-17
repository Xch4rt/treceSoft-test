export class User {
    public readonly id?: number;
    public username: string;
    public password?: string;
    public email: string;
    public name: string;
    public roleId: number;
    public role?: string;
    public status?: boolean;
    public readonly createdAt?: Date;

    constructor(
        username: string,
        email: string,
        name: string,
        roleId: number,
        password?: string,
        role?: string,
        id?: number,
        status?: boolean,
        createdAt?: Date,
    ) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.roleId = roleId;
        this.password = password;
        this.id = id;
        this.role = role;
        this.status = status ?? true; // Por defecto, el estado es verdadero
        this.createdAt = createdAt ?? new Date(); // Asigna la fecha actual si no se proporciona
    }
}