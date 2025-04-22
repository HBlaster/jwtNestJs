import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt'; // Import the JwtService to use for verifying JWTs
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {} 

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization); // Log the authorization header

    const token = this.extractTokenFromHeader(request); // Extract the token from the authorization header

    if (!token) {
      throw new UnauthorizedException('No token provided'); // If no token is provided, throw an error
    }

    try{
      const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret}); // Verify the token using the JwtService
      request.user = payload; // Attach the payload to the request object for further use

    }
    catch (error) {
      throw new UnauthorizedException('Incorrect Token') // Log the error if token validation fails
      }


    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
