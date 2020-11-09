import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { User } from 'src/models/interfaces/user.interface';
import { CommonService } from 'src/services/common.service';
import { FirebaseService } from 'src/services/firebase.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  public expenses: any;
  public userId: string;
  public groupId: string;
  public user: User;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private commonService: CommonService
  ) {
  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params.groupId;
      this.userId = params.userId;
      this.getUser();
      this.getExpenses()

    })
  }

  getUser() {
    this.firebaseService.findByOneQuery('users', ['id', '==', this.userId]).subscribe(users => {
      this.user = users[0];
    });
  }

  getExpenses() {
    this.firebaseService.findByTwoQueries(
      'expenses',
      ['groupId', '==', this.groupId],
      ['userId', '==', this.userId]
    )
      .subscribe(expenses => {
        console.log(expenses);
        this.expenses = expenses;
      })
  }

  goBack() {
    console.log('object');
    this.router.navigate([`/users/${this.groupId}`])
  }

  addExpense() {
    this.commonService.addExpenseAlert(this.user,  this.groupId)
  }

  editExpense(expense: any, slidingItem?: IonItemSliding) {
    slidingItem.close()
    console.log(expense);
    this.commonService.addExpenseAlert(this.user,  this.groupId, expense)

  }

  async deleteUser(user?: User) {
    await this.commonService.deleteWarningAlert(
      {
        collection: 'users',
        id: user.id,
        header: `Eliminar usuario ${user.name}`,
        message: 'Estas seguro',
        element: user
      }
    )
  }

  async deleteExpense(expense: any, slidingItem: IonItemSliding) {
    slidingItem.close();
    await this.commonService.deleteWarningAlert(
      {
        collection: 'expenses',
        id: expense.id,
        header: `Eliminar gasto ${expense.concept}`,
        message: 'Estas seguro',
        element: expense
      }
    )
  }

}
