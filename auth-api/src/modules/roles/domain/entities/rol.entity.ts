export class Rol {
    public readonly id?: number;
    public description: string;
    public status?: boolean;
    public readonly createdAt?: Date;

    constructor(
        description: string,
        id?: number,
        status?: boolean,
        createdAt?: Date
    ) {
        this.description = description;
        this.id = id;
        this.status = status ?? true;
        this.createdAt = createdAt ?? new Date();
    }
}