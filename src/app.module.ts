import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { InitService } from './init/init.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, InitService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly initService: InitService) {}

  async onModuleInit() {
    await this.initService.initializeDependencies();
  }
}
