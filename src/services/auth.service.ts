import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { GoogleResponse } from 'src/models/interfaces/google-response.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private googlePlus: GooglePlus
  ) { }

  loginWithGoogle(): Promise<GoogleResponse> {
    return new Promise((resolve, reject) => {
      this.googlePlus.login({})
        .then(res => resolve(res))
        .catch(err => console.error(err));
    });
  }
}
