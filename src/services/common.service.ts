import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Expense } from 'src/models/interfaces/expense.interface';
import { Group } from 'src/models/interfaces/group.interface';
import { User } from 'src/models/interfaces/user.interface';
import { ActivityService } from './activity.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public alertController: AlertController,
    private firebaseService: FirebaseService,
    private activityService: ActivityService
  ) { }



  async deleteWarningAlert(
    {
      header,
      id,
      collection,
      message,
      element
    }) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [,
        {
          text: 'Cancelar',
        },
        {
          text: 'Ok',
          handler: async (data) => {
            await this.deleteDocuments(collection, id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteDocuments(collection, id) {
    if (collection === 'groups') {
      await this.firebaseService.deleteDocument(collection, id);
      const fakeUsers: any = await this.firebaseService.getUsers(id);
      for (const user of fakeUsers) {
        await this.firebaseService.deleteDocument('users', user.id);
      }
    }
    else await this.firebaseService.deleteDocument(collection, id);

  }

  async addExpenseAlert(user: User, groupId: string, expense?: Expense) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo gasto para ' + user.name,
      inputs: [
        {
          name: 'concept',
          value: expense ? expense.concept : '',
          id: 'concept',
          type: 'text',
          placeholder: 'Concepto'
        },
        {
          name: 'details',
          id: 'details',
          value: expense ? expense.details : '',
          type: 'textarea',
          placeholder: 'Detalles'
        },
        {
          name: 'date',
          type: 'date',
          value: expense ? expense.date : this.getDate()
        },
        {
          name: 'time',
          value: expense ? expense.time : '',
          type: 'time'
        },
        {
          name: 'expense',
          placeholder: 'Cantidad',
          value: expense ? expense.expense : '',
          type: 'number',
          min: 0
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: async (data) => {
            data.expense = Number(data.expense);
            data.userId = user.id;
            data.groupId = groupId;
            let type: string;
            if (expense) {
              type = 'editExpense';
              await this.firebaseService.updateById('expenses', expense.id, data)
            } else {
              type = 'addExpense';
              expense = await this.firebaseService.insertOne('expenses', data)
            }

            await this.firebaseService.insertOne('activity', {
              type,
              expense: expense,
              groupId,
              date: this.getDate(),
            })
          }
        }
      ]
    });

    await alert.present();

  }

  getDate() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    let day: any = new Date().getDate()
    day = (day >= 10) ? day : `0${day}`
    return `${year}-${month}-${day}`
  }

  getTime() {
    return `${new Date().getHours()}:${new Date().getMinutes()}`
  }
}
