import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/models/interfaces/activity.interface';
import { User } from 'src/models/interfaces/user.interface';
import { UserService } from 'src/services/user.service';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {

  @Input() activity: Array<Activity>;
  @Input() groupName: string;
  userLogged: User;

  constructor(
    private userService: UserService
  ) {
    this.getUser().then();
  }

  ngOnInit() {
  }

  async getUser() {
    this.userLogged = await this.userService.getUser();
  }

  generateMessage(activity: Activity): string {
    let message: string;
    const itWasMe = this.userLogged.id === activity.user.id
    switch (activity.type) {
      case 'addGroup':
        message = (!itWasMe)
          ? `${activity.userName} ha creado el grupo ${activity.group.name}`
          : `Has creado el grupo ${activity.group.name}`
        break;
      case 'editGroup':
        message = (!itWasMe)
          ? `${activity.userName} ha editado el grupo ${activity.group.name}`
          : `Has editado el grupo ${activity.group.name}`
        break;
      case 'addUser':
        message = (!itWasMe)
          ? `${activity.userName} ha añadido al usuario ${activity.user.name}`
          : `Has añadido al usuario ${activity.user.name}`
        break
      case 'editUser':
        message = (!itWasMe)
          ? `${activity.userName} ha editado al usuario ${activity.user.name}`
          : `Has editado al usuario ${activity.user.name}`
        break
      case 'addExpense':
        message = (!itWasMe)
          ? `${activity.userName} ha añadido el gasto ${activity.expense.concept}`
          : `Has añadido el gasto ${activity.expense.concept}`
        break
      case 'editExpense':
        message = (!itWasMe)
          ? `${activity.userName} ha editado el gasto ${activity.expense.concept}`
          : `Has editado el gasto ${activity.expense.concept}`
        break
      default:
        break;
    }
    return message;
  }

}
