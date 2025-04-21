import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import {JwtModule} from '@nestjs/jwt'; // Importa el JwtService para usarlo en el AuthService
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [UsersModule, 
    JwtModule.register({
      secret: jwtConstants.secret, // Usa la variable de entorno JWT_SECRET para la clave secreta
      signOptions: { expiresIn: '1d' }, // Configura el tiempo de expiración del token
    })
  ], // Importa el UsersModule para poder usar el UsersService
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
