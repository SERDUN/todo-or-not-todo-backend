import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class AuthService {
  async register(email: string, password: string): Promise<string> {
    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });

      const token = await admin.auth().createCustomToken(userRecord.uid);

      return token;
    } catch (error) {
      throw new UnauthorizedException('Registration failed: ' + error.message);
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        await getAuth(firebase.getApp()),
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();

      return idToken;
    } catch (error) {
      throw new UnauthorizedException('Login failed: ' + error.message);
    }
  }
}
