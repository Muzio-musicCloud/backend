import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'id or email', description: "로그인 할 아이디 또는 메일" })
  @IsString()
  emailOrUserId: string;

  @ApiProperty({ example: 'userPassword', description: "로그인 할 비밀번호" })
  @IsString()
  password: string;
}