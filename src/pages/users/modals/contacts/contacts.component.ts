import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  @Input() data: string;
  contacts: any;
  mock = [
    {
      "addresses": null,
      "birthday": null,
      "categories": null,
      "displayName": "Raúl TT",
      "emails": null,
      "id": "99",
      "ims": null,
      "name": {
        "familyName": "TT",
        "formatted": "Raúl TT",
        "givenName": "Raúl",
      },
      "nickname": null,
      "note": null,
      "organizations": null,
      "phoneNumbers": [
        {
          "id": "299",
          "pref": false,
          "type": "mobile",
          "value": "+34 628 75 96 31"
        },
        {
          "id": "494",
          "pref": false,
          "type": "mobile",
          "value": "+34628759631"
        }],
      "photos": null,
      "rawId": "60",
      "urls": null
    },
    {
      "addresses": null,
      "birthday": null,
      "categories": null,
      "displayName": "Raúl TT",
      "emails": null,
      "id": "99",
      "ims": null,
      "name": {
        "familyName": "TT",
        "formatted": "Raúl TT",
        "givenName": "Raúl",
      },
      "nickname": null,
      "note": null,
      "organizations": null,
      "phoneNumbers": [
        {
          "id": "299",
          "pref": false,
          "type": "mobile",
          "value": "+34 628 75 96 31"
        },
        {
          "id": "494",
          "pref": false,
          "type": "mobile",
          "value": "+34628759631"
        }],
      "photos": null,
      "rawId": "60",
      "urls": null
    },
    {
      "addresses": null,
      "birthday": null,
      "categories": null,
      "displayName": "Raúl TT",
      "emails": null,
      "id": "99",
      "ims": null,
      "name": {
        "familyName": "TT",
        "formatted": "Raúl TT",
        "givenName": "Raúl",
      },
      "nickname": null,
      "note": null,
      "organizations": null,
      "phoneNumbers": [
        {
          "id": "299",
          "pref": false,
          "type": "mobile",
          "value": "+34 628 75 96 31"
        },
        {
          "id": "494",
          "pref": false,
          "type": "mobile",
          "value": "+34628759631"
        }],
      "photos": null,
      "rawId": "60",
      "urls": null
    },
    {
      "addresses": null,
      "birthday": null,
      "categories": null,
      "displayName": "Raúl TT",
      "emails": null,
      "id": "99",
      "ims": null,
      "name": {
        "familyName": "TT",
        "formatted": "Raúl TT",
        "givenName": "Raúl",
      },
      "nickname": null,
      "note": null,
      "organizations": null,
      "phoneNumbers": [
        {
          "id": "299",
          "pref": false,
          "type": "mobile",
          "value": "+34 628 75 96 31"
        },
        {
          "id": "494",
          "pref": false,
          "type": "mobile",
          "value": "+34628759631"
        }],
      "photos": null,
      "rawId": "60",
      "urls": null
    }
  ];


  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.contacts = (this.data) ? this.data : this.mock;
  }

  goBack() {
    this.modalCtrl.dismiss().then()
  }

  selectContact(contact) {
    this.modalCtrl.dismiss({ contact }).then()
  }

}
