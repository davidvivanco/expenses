import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupsPage } from './groups.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GroupsPageRoutingModule } from './groups-routing.module';
import { ComponentsModule } from 'src/components/components.module';
import { AddGroupModalComponent } from './modals/add-group-modal/add-group-modal.component';
import { UsersModalComponent } from './modals/users-modal/users-modal.component';
import { ExpensesModalComponent } from './modals/expenses-modal/expenses-modal.component';
import { ActivityModalComponent } from './modals/activity-modal/activity-modal.component';
import { MenuModalComponent } from './modals/menu-modal/menu-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ExploreContainerComponentModule,
    GroupsPageRoutingModule
  ],
  declarations: [
    GroupsPage,
    AddGroupModalComponent,
    UsersModalComponent,
    ExpensesModalComponent,
    ActivityModalComponent,
    MenuModalComponent
  ],
})
export class Tab1PageModule { }
