import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // Importa el UsersModule para poder usar el UsersService
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
