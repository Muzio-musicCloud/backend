import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: 'example@exampme.com', description: "회원가입 할 이메일" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'userId', description: "회원가입 할 아이디" })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'userPassword', description: "회원가입 할 비밀번호" })
  @IsString()
  password: string;

  @ApiProperty({ example: '기요미', description: "사용자 닉네임" })
  @IsString()
  nickname: string;
}