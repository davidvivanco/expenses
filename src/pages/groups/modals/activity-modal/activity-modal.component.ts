import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/models/interfaces/user.interface';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.scss'],
})
export class ActivityModalComponent implements OnInit {

  @Input() group: any;
  @Input() user: User;
  private activity: any;
  private title: string;

  constructor(
    private firebaseService: FirebaseService,
    private modalController: ModalController
  ) { 
    this.title = 'Actividad'
  }

  ngOnInit() {
    console.log('ACTIVITY MODAL GROUP', this.group);
    this.firebaseService.findBy('activity', ['groupId', '==', this.group._id])
      .subscribe(activity => {
        console.log(activity);
        this.activity = activity;
      })
  }

  closeModal() {
    this.modalController.dismiss({
      cssClass: "animated",
      'dismissed': true,
    });
  }

}
