import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: "Users username"
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: "Users password"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    description: "Users email"
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: "Users full name"
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: "Role ID to assign"
  })
  @IsNumber()
  @IsNotEmpty()
  readonly roleId: number;
}
