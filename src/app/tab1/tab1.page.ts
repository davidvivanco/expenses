import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private googlePlus: GooglePlus,
    private auth: AngularFireAuth
  ) { }


  async loginGoogle() {

    this.googlePlus.login({
   
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  
    // let res = await this.signInWithGoogle();
    // console.log('res',res);
  }

  signInWithGoogle(): any {
    return new Promise((reject, resolve) => {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider).then(
        res => {
          console.log('sss',res);
          resolve(res);
        }
      ).catch(e => {
        console.log(e);
      })
    })
  }

}
