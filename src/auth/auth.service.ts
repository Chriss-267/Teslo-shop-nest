import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      //delete user.password;

      //npm install bcrypt
      //npm install -D @types/bcrypt
      //npm install @nestjs/passport passport
      //npm install @nestjs/jwt passport-jwt
      //npm install -D @types/passport-jwt
      return user;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true }
      });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials email');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials password');
      }

      return user;
      //TODO: Generar JWT

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Something went wrong');
  }
}
