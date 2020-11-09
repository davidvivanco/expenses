import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExpensesPageRoutingModule } from './expenses-routing.module';
import { ExpensesPage } from './expenses.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    ExpensesPage,
    ModalController
  ],
  exports:[
    ModalController
  ]
})
export class ExpensesPageModule {}
