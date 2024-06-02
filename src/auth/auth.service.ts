import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  async register(email: string, password: string): Promise<string> {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      return await admin.auth().createCustomToken(userRecord.uid);
    } catch (error) {
      throw new UnauthorizedException('Registration failed');
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      return await admin.auth().createCustomToken(userRecord.uid);
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }
}