import { Injectable } from '@angular/core';
import { User } from 'src/models/interfaces/user.interface';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: Storage) { }

  setUser(user: User): void {
    this.storage.set('user', user);
  }

  setToken(token: string): void {
    this.storage.set('token', token);
  }

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.storage.get('user').then((user) => {
        console.log('Your user is', user);
        resolve(user)
      });
    })
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        console.log('Your token is', token);
        resolve(token)
      });
    })
  }
}
