import { Injectable } from '@angular/core';
import { User } from 'src/models/interfaces/user.interface';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storage: Storage) { }

  setUser(user: User) {
    return new Promise((resolve, reject) => {
      this.storage.set('user', user).then((user) => {
        resolve(user)
      });
    })
    //this.storage.set('user', user);
  }

  setToken(token: string) {
    return new Promise((resolve, reject) => {
      this.storage.set('token', token).then((token) => {
        resolve(token)
      });
    })
    // this.storage.set('token', token);
  }

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then((user) => {
        resolve(user)
      });
    })
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        resolve(token)
      });
    })
  }
}
