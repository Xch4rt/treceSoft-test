import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateRolDto {
    @ApiProperty({
        description: "Rols description"
    })
    @IsString()
    @IsNotEmpty()
    public readonly description: string;
}