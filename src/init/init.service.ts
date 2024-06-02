import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase/app';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InitService {
  constructor(private configService: ConfigService) {}

  async initializeDependencies() {
    const firebaseConfig = {
      apiKey: this.configService.get<string>('FB_API_KEY'),
      authDomain: this.configService.get<string>('FB_AUTH_DOMAIN'),
      databaseURL: this.configService.get<string>('FB_DATABASE_URL'),
      projectId: this.configService.get<string>('FB_PROJECT_ID'),
      storageBucket: this.configService.get<string>('FB_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('FB_MESSAGING_SENDER_ID'),
      appId: this.configService.get<string>('FB_APP_ID'),
    };

    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized');
  }
}
