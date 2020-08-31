import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsPage } from './groups.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GroupsPageRoutingModule } from './groups-routing.module';
import { ComponentsModule } from 'src/components/components.module';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    GroupsPageRoutingModule
  ],
  declarations: [
    GroupsPage,
    AddGroupComponent,
    AvatarComponent,
    
  ],
})
export class Tab1PageModule { }
