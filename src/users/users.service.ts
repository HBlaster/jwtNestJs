import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Inyectamos el repositorio de TypeORM para la entidad User
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto); // Guardamos el nuevo usuario en la base de datos
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } }); // Buscamos un usuario por su email
  }



  /* probably not needed*/
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
