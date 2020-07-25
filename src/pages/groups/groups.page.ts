import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from 'src/services/firebase.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/interfaces/user.interface';
import { ModalController } from '@ionic/angular';
import { AddGroupModalComponent } from './add-group-modal/add-group-modal.component';


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
    this.title = 'Grupos'
    this.getGroups().then();
  }

  async getGroups() {
    this.user = await this.userService.getUser();
    this.firebaseService.findBy('groups', ['_id', 'in', this.user.groups]).subscribe((groups: any) => {
      this.groups = [];
      groups.forEach((group: any) => {
         const index = this.user.groups.findIndex(g=> g === group._id);
          this.groups[index] = group;
      });
    });
  }

  
  async openAddGroupModal() {
    const modal = await this.modalController.create({
      component: AddGroupModalComponent,
      cssClass: "animated",
      swipeToClose: true
    });
    return await modal.present();
  }

  async reorderGroups() {
    const groupIdsContainer = this.groups.map((group: any) => group.id);
    await this.firebaseService.updateById('users', this.user._id, { groups: groupIdsContainer })
    this.user.groups = groupIdsContainer;
    this.userService.setUser(this.user);
  }

}
