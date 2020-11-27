import { Component } from '@angular/core';
import { User } from 'src/models/interfaces/user.interface';
import { FirebaseService } from 'src/services/firebase.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-activity-page',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage {

  user: User;
  activity: any;


  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) {
    this.userService.getUser().then(user => {
      console.log(user);
      this.user = user;
      this.getActivity()
    })
  }

  getActivity() {
    this.firebaseService.findByOneQuery('activity', ['group.id', 'in', this.user.groups]).subscribe((activity: any) => {
      this.activity = activity;
      console.log(activity);
     })
  }
}
