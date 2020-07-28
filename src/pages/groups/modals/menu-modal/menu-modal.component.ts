import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/models/interfaces/user.interface';
import { UsersModalComponent } from '../users-modal/users-modal.component';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss'],
})
export class MenuModalComponent implements OnInit {

  @Input() user: User
  @Input() group: any

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log('object', this.group);
  }


  closeModal(goToGroups: boolean = false) {
    this.modalController.dismiss({
      cssClass: "animated",
      'dismissed': true,
      componentProps: { goToGroups }
    });
  }

  async openUsersModal() {
    this.closeModal();
    const modal = await this.modalController.create({
      component: UsersModalComponent,
      cssClass: "animated",
      swipeToClose: true,
      componentProps: { group: this.group }
    });
    return await modal.present();

  }

}
