import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
  ],
  controllers: [],
  providers: [],
})
export class WebappModule {}
