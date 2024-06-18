import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RecoverPasswordDto {
  @ApiProperty({
    description: "Users username"
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: "Users email"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly email: string;
}
