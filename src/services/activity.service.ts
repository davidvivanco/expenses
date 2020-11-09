import { Injectable } from '@angular/core';
import { Activity } from 'src/models/interfaces/activity.interface';
import { User } from 'src/models/interfaces/user.interface';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  userLogged: User;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {

  }

  async insertOne(activity: Activity) {
    const user = await this.getUser();
    activity.user = user;
    activity.img =  user.imageUrl || user.img;

    await this.firebaseService.insertOne('activity', activity)
  }

  async getUser(): Promise<User> {
    return await this.userService.getUser();
  }
}
