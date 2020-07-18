import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Platform } from '@ionic/angular';
import { GoogleLogin } from 'src/mocks/googleLogin';
import { GoogleResponse } from 'src/models/interfaces/google-response.interface';
import { FirebaseService } from 'src/services/firebase.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/interfaces/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'page-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {


  private token: string;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private googleLogin: GoogleLogin,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private router: Router

  ) {
  }

  ngOnInit() {
  }

  login(): void {
    this.router.navigate(['login']);
  }

  signup(): void {
    this.router.navigate(['signup']);
  }

  async loginWithGoogle() {
    if (this.platform.is('cordova')) {
      let loginGoogle = await this.authService.loginWithGoogle();
    } else {
      const googleLoginResponseMock = this.googleLogin.loginResponse;
      this.token = googleLoginResponseMock.accessToken;
      const user: User = this.userBuilder(googleLoginResponseMock);
      const userInDatabase = await this.firebaseService.getOne('users', ['id', '==', user.id]);
      if (!userInDatabase) await this.firebaseService.insertOne('users', user);
      this.setSessionStorage(this.token, user);
    }
  }

  userBuilder(employeeData: GoogleResponse): User {
    return {
      id: employeeData.userId,
      name: employeeData.givenName,
      lastname: employeeData.familyName,
      email: employeeData.email,
    }
  }

  setSessionStorage(token: string, user: User): void {
    this.userService.setUser(user);
    this.userService.setToken(token);
  }

}
