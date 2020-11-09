import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/interfaces/user.interface';
import { Group } from 'src/models/interfaces/group.interface';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: Array<User>;
  @Input() group: Group;

  @Output() onItemsOrderChanged: EventEmitter<string>;
  @Output() onClick: EventEmitter<User>;
  @Output() onActivity: EventEmitter<User | Group>;
  @Output() onActivityGroup: EventEmitter<Group>;
  @Output() onDelete: EventEmitter<{ index: number, user?: User, group?: Group }>;
  @Output() onEditGroup: EventEmitter<{ group: Group }>;
  @Output() onEditUser: EventEmitter<User>;
  @Output() onAddExpense: EventEmitter<User>;

  constructor(
    private router: Router,
    private commonService: CommonService
  ) {
    this.onItemsOrderChanged = new EventEmitter();
    this.onClick = new EventEmitter();
    this.onActivity = new EventEmitter();
    this.onActivityGroup = new EventEmitter();
    this.onDelete = new EventEmitter();
    this.onEditGroup = new EventEmitter();
    this.onEditUser = new EventEmitter();
    this.onAddExpense = new EventEmitter();
  }

  ngOnInit() { }



  clickInItem(user: User, slidingItem) {
    if (!Object.values(slidingItem.el.classList).includes('item-sliding-active-options-end'))
      this.router.navigate([`/expenses/${user.id}/${this.group.id}`], { state: {} });

  }

  clickInMenu(user: User) {
    this.onActivity.emit(user);
  }

  async deleteUser(index?: number, user?: User, group?: Group) {
    await this.commonService.deleteWarningAlert(
      {
        collection: 'users',
        id: user.id,
        header: `Eliminar usuario ${user.name}`,
        message: 'Estas seguro',
        element: user
      }
    )
  }

  editGroup(group: Group) {
    console.log(group);
    this.onEditGroup.emit({ group });
  }

  activityGroup(group: Group) {
    this.router.navigate([`/tabs/groups`], { queryParams: { groupId: group.id, activity: true } })
  }

  async deleteGroup(group: Group) {
    await this.commonService.deleteWarningAlert({
      collection: 'groups',
      id: group.id,
      header: 'Eliminar grupo A',
      message: 'Estas seguro',
      element: group
    })
  }

  editUser(user: User, slidingItem?: IonItemSliding) {
    slidingItem.close()
    this.onEditUser.emit(user)
  }

  activity(user: User) {
    this.onActivity.emit(user);
  }

  addExpense(user: User, slidingItem?: IonItemSliding) {
    slidingItem.close()
    this.onAddExpense.emit(user)
  }

}
