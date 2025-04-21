import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor( private readonly usersService: UsersService) {}

    login() {
        return 'login working';
    }

    register(registerDto: RegisterDto) {
        return registerDto;
    }
}
