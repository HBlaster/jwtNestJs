import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('register')
  register(@Body() oRegisterDto: RegisterDto) {
    return this.authService.register(oRegisterDto); 
    // return oRegisterDto;
  }
}
