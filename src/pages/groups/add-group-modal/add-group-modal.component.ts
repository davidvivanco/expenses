import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss'],
})
export class AddGroupModalComponent implements OnInit {

  constructor(
    public modalController: ModalController

  ) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss({
      cssClass: "animated",
      'dismissed': true,      
    });
  }

}
