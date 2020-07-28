import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ReorderListComponent } from './reorder-list/reorder-list.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ListComponent } from './list/list.component';




@NgModule({
  declarations: [
    HeaderComponent,
    ProgressBarComponent,
    ReorderListComponent,
    MainHeaderComponent,
    ModalHeaderComponent,
    ListComponent
  ],
  exports: [
    HeaderComponent,
    ProgressBarComponent,
    ReorderListComponent,
    MainHeaderComponent,
    ModalHeaderComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }