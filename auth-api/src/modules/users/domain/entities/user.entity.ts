export class User {
    public readonly id?: number;
    public username: string;
    public password?: string;
    public email: string;
    public name: string;
    public status?: boolean;
    public readonly createdAt?: Date;

    constructor(
        username: string,
        email: string,
        name: string,
        password?: string,
        id?: number,
        status?: boolean,
        createdAt?: Date,
    ) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.password = password;
        this.id = id;
        this.status = status ?? true; // Por defecto, el estado es verdadero
        this.createdAt = createdAt ?? new Date(); // Asigna la fecha actual si no se proporciona
    }
}