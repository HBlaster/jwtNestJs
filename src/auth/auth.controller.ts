import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() oLoginDto: LoginDto) {
    return this.authService.login(oLoginDto);
  }

  @Post('register')
  register(@Body() oRegisterDto: RegisterDto) {
    return this.authService.register(oRegisterDto); 
  }


  @Get('profile')
  @UseGuards(AuthGuard) // Use the AuthGuard to protect this route
  getProfile(
    @Request() request: any, // Use the appropriate type for the request object
  ) {
    return request.user; // This is just a placeholder. You can implement the actual logic to get the user profile.
  }
}
