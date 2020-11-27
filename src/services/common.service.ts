import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Activity } from 'src/models/interfaces/activity.interface';
import { Expense } from 'src/models/interfaces/expense.interface';
import { Group } from 'src/models/interfaces/group.interface';
import { User } from 'src/models/interfaces/user.interface';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public alertController: AlertController,
    private firebaseService: FirebaseService,

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
      await this.deleteAllActivity(id, 'group.id', '==');
      await this.deleteAllExpenses(id, 'groupId', '==');
      await this.deleteAllUsers(id);
    } else if (collection === 'users') {
      await this.deleteAllExpenses(id, 'userId', '==');
    }

    await this.firebaseService.deleteDocument(collection, id);

  }

  async deleteAllExpenses(id: string, fieldToQuery: string, operator: any) {
    const expenses: Array<Expense> = await this.firebaseService
      .getElementsByOneQuery('expenses', id, fieldToQuery, operator);

    for (const expense of expenses) {
      await this.firebaseService.deleteDocument('expenses', expense.id);
    }
  }

  async deleteAllActivity(id: string, fielToQuery, operator) {
    const allActivity: Array<Activity> = await this.firebaseService
      .getElementsByOneQuery('activity', id, fielToQuery, operator)

    for (const activity of allActivity) {
      if (activity.type !== 'deleteGroup') {
        await this.firebaseService.deleteDocument('activity', activity.id);
      }
    }
  }

  async deleteAllUsers(groupId) {
    const fakeUsers: any = await this.firebaseService.getUsers(groupId);
    for (const user of fakeUsers) {
      await this.firebaseService.deleteDocument('users', user.id);
    }
  }

  async addExpenseAlert(user: User, group: Group, userLogged: User, opts?:
    { expense?: Expense, users?: Array<User>, readonly?: boolean }) {
    const readonly = opts ? opts.readonly : null;
    let expense = opts ? opts.expense : null;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header:(expense)?`Gasto ${expense.concept}`: 'Nuevo gasto para ' + user.name,
      inputs: [
        {
          name: 'concept',
          value: expense ? expense.concept : '',
          id: 'concept',
          type: 'text',
          disabled: readonly,
          placeholder: 'Concepto'
        },
        {
          name: 'details',
          id: 'details',
          value:expense ? expense.details : '',
          type: 'textarea',
          disabled: readonly,
          placeholder: 'Detalles'
        },
        {
          name: 'date',
          type: 'date',
          disabled: readonly,
          value: expense ? expense.date : this.getDate(new Date().getTime())
        },
        {
          name: 'time',
          value: expense ? expense.time : this.getTime(new Date().getTime()),
          type: 'time',
          disabled:readonly,
        },
        {
          name: 'expense',
          placeholder: 'Cantidad',
          value: expense ? expense.expense : '',
          type: 'number',
          disabled:readonly,
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
            console.log(data);
            data.expense = Number(data.expense);
            data.userId = user.id;
            data.groupId = group.id;
            let type: string;
            if (expense) {
              type = 'editExpense';
              await this.firebaseService.updateById('expenses', expense.id, data)
            } else {
              type = 'addExpense';
              const res: any = await this.firebaseService.insertOne('expenses', data);
              expense = { ...res, ...data }
            }

            if (opts.users) this.getTotalExpensesPerUser(opts.users);

            await this.firebaseService.insertOne('activity', {
              type,
              expense,
              user,
              userLogged,
              group,
              date: new Date().getTime()
            })
          }
        }
      ]
    });

    await alert.present();

  }

  getDate(date: any) {

    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let day: any = date.getDate();
    day = (day >= 10) ? day : `0${day}`
    return `${year}-${month}-${day}`
  }

  getTime(date: any) {
    date = new Date(date)
    return `${date.getHours()}:${date.getMinutes()}`
  }

  async getTotalExpensesPerUser(users: Array<User>) {
    for (const user of users) {
      console.log('USER', user);
      user.totalExpenses = await this.firebaseService.getTotalExpenses(user.id, 'userId')
    }
  }
}
