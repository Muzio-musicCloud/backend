import { Body, Controller, Get, HttpCode, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersEntity } from '@entities/users.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('check-email')
  @ApiOperation({ summary: '이메일 중복 확인', description: '이메일 중복 확인 API' })
  @ApiResponse({ status: 200, description: '중복되지 않는 경우' })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일일 경우' })
  async checkEmail(@Query('email') email: string) {
    return this.authService.checkEmail(email);
  }

  @Get('check-userid')
  @ApiOperation({ summary: '아이디 중복 확인', description: '아이디 중복 확인 API' })
  @ApiResponse({ status: 200, description: '중복되지 않는 경우' })
  @ApiResponse({ status: 409, description: '이미 존재하는 아이디일 경우' })
  async checkUserId(@Query('userId') userId: string) {
    return this.authService.checkUserId(userId);
  }
  
  @Post('register')
  @ApiOperation({ summary: '회원가입', description: '자체 회원가입 API' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: '회원가입에 성공한 경우' })
  @ApiResponse({ status: 409, description: '이미 존재하는 회원' })
  async register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인', description: '자체 로그인 API' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200,  description: 'jwt 토큰 반환', type: String })
  @ApiResponse({ status: 404, description: '존자하지 않는 유저일 경우' })
  @ApiResponse({ status: 401, description: '계정 정보가 맞지 않는 경우' })
  async login(@Body() loginData: LoginDto) {
    const user = await this.authService.validateUser(loginData);
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: '구글 로그인', description: '구글 로그인 API' })
  @ApiResponse({ status: 409, description: '이미 존재하는 메일일 경우' })
  async googleLogin() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: '구글 로그인 콜백', description: '구글 로그인 콜백 API' })
  @ApiResponse({ status: 200, description: 'jwt 토큰 반환', type: String })
  async googleLoginCallback(@Req() req) {
    const user = req.user as UsersEntity;
    return this.authService.login(user);
  }

}
