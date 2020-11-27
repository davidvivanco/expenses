import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/models/interfaces/activity.interface';
import { User } from 'src/models/interfaces/user.interface';
import { CommonService } from 'src/services/common.service';
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
    private userService: UserService,
    private commonService: CommonService
  ) {
    this.getUser().then();
  }

  ngOnInit() {

    this.activity.sort((a, b) => (a.date > b.date) ? 1 : -1)
  }

  async getUser() {
    this.userLogged = await this.userService.getUser();
  }

  generateMessage(activity: Activity): string {
    let message: string;
    const itWasMe = this.userLogged.id === activity.userLogged.id
    switch (activity.type) {
      case 'addGroup':
        message = (!itWasMe)
          ? `${activity.userLogged.name} ha creado el grupo ${activity.group.name}`
          : `Has creado el grupo ${activity.group.name}`
        break;
      case 'editGroup':
        message = (!itWasMe)
          ? `${activity.userLogged.name} ha editado el grupo ${activity.group.name}`
          : `Has editado el grupo ${activity.group.name}`
        break;
      case 'addUser':
        message = (!itWasMe)
          ? `${activity.userLogged.name} ha añadido al usuario ${activity.user.name}`
          : `Has añadido al usuario ${activity.user.name}`
        break
      case 'editUser':
        message = (!itWasMe)
          ? `${activity.userLogged.name} ha editado al usuario ${activity.user.name}`
          : `Has editado al usuario ${activity.user.name}`
        break
      case 'addExpense':
        message = (!itWasMe)
          ? `${activity.userLogged.name} ha añadido el gasto ${activity.expense.concept}`
          : `Has añadido el gasto ${activity.expense.concept}`

        message += ` al usuario ${activity.user.name}`


        break
      case 'editExpense':
        message = (!itWasMe)
          ? `${activity.userLogged.name} ha editado el gasto ${activity.expense.concept}`
          : `Has editado el gasto ${activity.expense.concept}`

        message += ` al usuario ${activity.user.name}`
        break
      default:
        break;
    }
    return message;
  }

}
