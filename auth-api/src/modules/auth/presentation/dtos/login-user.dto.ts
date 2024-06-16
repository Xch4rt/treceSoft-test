import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
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
}
