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
  private showProgressBar: boolean

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private googleLogin: GoogleLogin,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private router: Router

  ) {
    this.showProgressBar = false;
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
    let user: User;
    if (this.platform.is('cordova')) {
      let loginGoogle = await this.authService.loginWithGoogle();
      user = this.userBuilder(loginGoogle);
      console.log(loginGoogle);
    } else {
      const googleLoginResponseMock = this.googleLogin.loginResponse;
      this.token = googleLoginResponseMock.accessToken;
      user = this.userBuilder(googleLoginResponseMock);
    }
    this.showProgressBar = true;

    const userInDatabase: any = await this.firebaseService.getUser('users', user.id, ['googleId', '==', user.googleId]);
    console.log(userInDatabase);

    if (!userInDatabase) {
      await this.firebaseService.insertOne('users', user, true);
      await this.setSessionStorage(this.token, user);
    } else await this.setSessionStorage(this.token, userInDatabase);
    this.showProgressBar = false;
    this.router.navigate(['tabs']);
  }




  userBuilder(employeeData: GoogleResponse): User {
    return {
      googleId: employeeData.userId,
      name: employeeData.givenName,
      lastname: employeeData.familyName,
      email: employeeData.email,
      imageUrl: employeeData.imageUrl,
      groups:[]
    }
  }

  async setSessionStorage(token: string, user: User) {
    await this.userService.setUser(user);
    await this.userService.setToken(token);
  }

}
