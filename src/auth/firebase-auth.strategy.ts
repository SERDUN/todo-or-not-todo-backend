import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(idToken: string) {
    console.info('validate');
    try {
      return await admin.auth().verifyIdToken(idToken, true);
    } catch (err) {
      console.warn(err);
      throw new UnauthorizedException();
    }
  }
}
