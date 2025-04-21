import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o el nombre del contenedor si estás accediendo desde otro
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'auth-test-db',
      entities: [],
      synchronize: true, // ⚠️ solo para desarrollo, desactivá esto en producción
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
