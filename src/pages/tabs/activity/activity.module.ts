import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityPage } from './activity.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ActivityPageRoutingModule } from './activity-routing.module';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ExploreContainerComponentModule,
    ActivityPageRoutingModule
  ],
  declarations: [ActivityPage]
})
export class Tab2PageModule {}
