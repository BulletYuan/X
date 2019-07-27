import { Module, HttpModule } from '@nestjs/common';

import { LoginController } from './controllers/login/login.controller';
import { LoginService } from './controllers/login/login.service';

@Module({
  controllers: [
    LoginController,
  ],
  imports: [
    HttpModule,
  ],
  providers: [
    LoginService,
  ],
})

export class AdminModule { }