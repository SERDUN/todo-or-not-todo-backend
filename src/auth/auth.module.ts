import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-jwt' })],
  providers: [FirebaseAuthStrategy, AuthService],
  exports: [PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}