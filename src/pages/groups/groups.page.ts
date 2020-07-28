import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from 'src/services/firebase.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/interfaces/user.interface';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { AddGroupModalComponent } from './modals/add-group-modal/add-group-modal.component';
import { UsersModalComponent } from './modals/users-modal/users-modal.component';
import { ActivityModalComponent } from './modals/activity-modal/activity-modal.component';
import { MenuModalComponent } from './modals/menu-modal/menu-modal.component';


@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {

  private groups: Array<object>;
  private type: string;
  private title: string;
  private user: User;

  constructor(
    private db: AngularFirestoreModule,
    private firebaseService: FirebaseService,
    private userService: UserService,
    public modalController: ModalController
  ) {
    this.type = 'groups'
    this.title = 'Mis grupos'
    this.getGroups().then();
  }

  async getGroups() {
    this.user = await this.userService.getUser();
    this.firebaseService.findBy('groups', ['_id', 'in', this.user.groups]).subscribe((groups: any) => {
      this.groups = [];
      groups.forEach((group: any) => {
        const index = this.user.groups.findIndex(g => g === group._id);
        this.groups[index] = group;
      });
    });
  }

  async openModalController(options) {
    const modal = await this.modalController.create(options);
    return await modal.present();
  }


  async openAddGroupModal() {
    await this.openModalController({
      component: AddGroupModalComponent,
      cssClass: "animated",
      swipeToClose: true
    });
  }


  async openUsersModal(group) {
    await this.openModalController({
      component: UsersModalComponent,
      cssClass: "animated",
      swipeToClose: true,
      componentProps: { group }
    });
  }

  async reorderGroups() {
    const groupIdsContainer = this.groups.map((group: any) => group.id);
    await this.firebaseService.updateById('users', this.user._id, { groups: groupIdsContainer })
    this.user.groups = groupIdsContainer;
    this.userService.setUser(this.user);
  }

  async goToUsers(e: EventResponse) {
    // if (e.slidingItem) e.slidingItem.close();
    await this.openUsersModal(e)
  }

  async openMenuModal(e) {
    await this.openModalController({
      component: MenuModalComponent,
      cssClass: "animated",
      swipeToClose: true,
      componentProps: { group:e }
    });
  }

  deleteGroup(e: EventResponse) {
    console.log('delete', e);
  }

  editGroup(e: EventResponse) {
    if (e.slidingItem) e.slidingItem.close();
    console.log('edit', e);
  }

  async goToActivity(e: EventResponse) {
    e.slidingItem.close();
    console.log('activity', e);
    await this.openModalController({
      component: ActivityModalComponent,
      cssClass: "animated",
      swipeToClose: true,
      componentProps: { group: e.item, user: this.user }
    });
  }

}

interface EventResponse {
  item: any,
  slidingItem: IonItemSliding
}
