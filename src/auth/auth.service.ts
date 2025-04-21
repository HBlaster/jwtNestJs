import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login() {
    return 'login working';
  }

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
}
