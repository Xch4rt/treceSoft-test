import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsNumber } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: "Users id"
  })
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({
    description: "Password token"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly token: string;
  
  @ApiProperty({
    description: "Users new password"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
