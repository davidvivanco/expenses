import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupsPage } from './groups.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GroupsPageRoutingModule } from './groups-routing.module';
import { ComponentsModule } from 'src/components/components.module';
import { AddGroupModalComponent } from './add-group-modal/add-group-modal.component';

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
    AddGroupModalComponent]
})
export class Tab1PageModule { }
