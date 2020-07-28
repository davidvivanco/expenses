import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/models/interfaces/user.interface';

@Component({
  selector: 'app-expenses-modal',
  templateUrl: './expenses-modal.component.html',
  styleUrls: ['./expenses-modal.component.scss'],
})
export class ExpensesModalComponent implements OnInit {

  @Input() user: User
  @Input() group: any
  private expenses:any;


  constructor(
    private modalController: ModalController,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.find('expenses', ['userId', '==', this.user._id], ['groupId', '==', this.group._id])
      .subscribe(expenses => {
        console.log(expenses);
        this.expenses = expenses;
      })
  }


  closeModal(goToGroups: boolean = false) {
    this.modalController.dismiss({
      cssClass: "animated",
      'dismissed': true,
      componentProps: { goToGroups }
    });
  }
  
  backToGroups() {
    this.closeModal(true);
  }
}
