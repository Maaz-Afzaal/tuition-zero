import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.NODE_ENV + ' server is running!';
  }
}
