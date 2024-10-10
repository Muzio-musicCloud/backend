import { UsersEntity } from '@entities/users.entity';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async checkEmail(email: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
  }

  async checkUserId(userId: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { userId } });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }
  }

  async register(userData: RegisterDto): Promise<UsersEntity> {
    await this.checkEmail(userData.email);
    await this.checkUserId(userData.userId);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async validateUser(loginData: LoginDto): Promise<UsersEntity | null> {
    const { emailOrUserId, password } = loginData;

    const user = await this.userRepository.findOne({
      where: [
        { email: emailOrUserId },
        { userId: emailOrUserId }
      ]
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 맞지 않습니다.');
    }

    return user;
  }

  login(user: UsersEntity): String {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateOAuthUser(profile: Partial<UsersEntity>): Promise<UsersEntity> {
    let user = await this.userRepository.findOne({ where: { email: profile.email } });

    if (!user) {
      user = this.userRepository.create(profile);
      await this.userRepository.save(user);
    }

    if(user.provider === 'local') {
      throw new ConflictException('이 이메일은 이미 등록된 메일입니다.')
    }

    return user;
  }

  async validateJwtPayload(payload: any): Promise<UsersEntity> {
    return this.userRepository.findOne(payload.sub)
  }
}
