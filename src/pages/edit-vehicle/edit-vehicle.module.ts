import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditVehiclePage } from './edit-vehicle';

@NgModule({
  declarations: [
    EditVehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(EditVehiclePage),
  ],
})
export class EditVehiclePageModule {}
