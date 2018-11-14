import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDriverPage } from './edit-driver';

@NgModule({
  declarations: [
    EditDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDriverPage),
  ],
})
export class EditDriverPageModule {}
