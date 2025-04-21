import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Inject the JwtService to use for generating JWTs
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email); // Check if the user already exists
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return await this.usersService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10), // Hash the password before saving it
    });
  }

  async login({email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email); // Check if the user exists
    if (!user) {
      throw new UnauthorizedException('email not found'); // If the user does not exist, throw an error
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password); // Compare the password with the hashed password
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password'); // If the password is invalid, throw an error
    }
    const payload = { email: user.email}; // Create a payload for the JWT
    const token = this.jwtService.sign(payload); // Generate a JWT using the payload
    return {
      access_token: token, // Return the JWT as the access token
      email: user.email, // Return the user's email
    };
    
}
}
