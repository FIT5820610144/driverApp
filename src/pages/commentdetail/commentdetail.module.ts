import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentdetailPage } from './commentdetail';

@NgModule({
  declarations: [
    CommentdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentdetailPage),
  ],
})
export class CommentdetailPageModule {}
