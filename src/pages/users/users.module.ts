import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/components/components.module';
import { UsersPageRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersPage } from './users.page';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { Contacts } from '@ionic-native/contacts/ngx';
import { ContactsComponent } from './modals/contacts/contacts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    UsersPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserListComponent,
    AddUserComponent,
    ContactsComponent,
    UsersPage
  ],
  providers:[
    Contacts
  ]
})
export class UsersPageModule {}
