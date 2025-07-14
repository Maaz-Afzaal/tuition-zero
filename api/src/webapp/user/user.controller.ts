import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly _service: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this._service.getAllUsers();
  }
}
