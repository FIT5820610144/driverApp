import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommentdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commentdetail',
  templateUrl: 'commentdetail.html',
})
export class CommentdetailPage {
  comment_details:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('comment_detail', navParams.get('comment_details'));
    this.comment_details = navParams.get('comment_details');
    if(this.comment_details == 'undefined' || this.comment_details == ''){
      console.log("no comment");
      this.comment_details = 'ไม่มีความคิดเห็น'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentdetailPage');
  }

  closeModal(){
    this.navCtrl.pop()
  }

}
