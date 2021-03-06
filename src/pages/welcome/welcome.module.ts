import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { AuthService } from 'src/services/auth.service';
import { GoogleLogin } from 'src/mocks/googleLogin';
import { FirebaseService } from 'src/services/firebase.service';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    WelcomePageRoutingModule
  ],
  declarations: [WelcomePage],
  providers:[
    GoogleLogin,
    AuthService,
    FirebaseService
  ]
})
export class WelcomePageModule {}
