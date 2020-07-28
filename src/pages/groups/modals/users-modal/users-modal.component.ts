import { Component, OnInit, Input } from '@angular/core';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/models/interfaces/user.interface';
import { ExpensesModalComponent } from '../expenses-modal/expenses-modal.component';
import { ComponentsModule } from 'src/components/components.module';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss'],
})
export class UsersModalComponent implements OnInit {

  @Input() group: any;
  private users: Array<User>

  constructor(
    private modalController: ModalController,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    console.log(this.group);
    this.firebaseService.findBy('users', ['_id', 'in', this.group.users]).subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }


  closeModal() {
    this.modalController.dismiss({
      cssClass: "animated",
      'dismissed': true,
    });
  }

  async openExpensesModal(user) {
    const modal = await this.modalController.create({
      component: ExpensesModalComponent,
      cssClass: "animated",
      swipeToClose: true,
      componentProps: { user, group: this.group }
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data.componentProps.goToGroups) {
        //TODO: No funciona  cerrar las dos modales al volver a groups
        this.closeModal();
      }
    })
    return await modal.present();
  }

  editUser(e: { item: any, slidingItem: IonItemSliding }) {
    console.log(e);
    e.slidingItem.close();
  }

  deleteUser(e) {
    console.log(e);
  }

  async goToExpenses(e) {
    console.log(e);
    await this.openExpensesModal(e.item);
  }

}
