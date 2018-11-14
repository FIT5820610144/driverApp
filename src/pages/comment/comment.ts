import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ModalOptions } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service'
import { Ionic2RatingModule } from 'ionic2-rating';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  rate:any = 0;
  commentList:any
  myModal:any
  noData = false
  showData = true
  globalUrl:any
  myUrl:any
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public driverService: DriverServiceProvider,
     public modalCtrl: ModalController,) {
  }

  onModelChange(event){
    this.rate = event;
    console.log(event);
  }

  getdriSSN(){
    this.driverService.getDriver().subscribe(data=>{
     var dri_ssn = data[0].dri_ssn;
      console.log("ssn = ",dri_ssn)
      this.commentDetail(dri_ssn)
    })
   
    
  }
  commentDetail(dri_ssn){
    this.driverService.getComment(dri_ssn).subscribe(data=>{
      this.commentList = data
     // console.log("rate = ",data[0].rate)
      console.log("commnetList = ",data)
      if(data[0].dri_record == 0){
        console.log("00000")
        this.noData = true
        this.showData = false
      }

      var i = 0;
               var myRate = []
               var total_rate = 0;
               var avg_rate = 0;
              // var long = this.recordList
              for (i = 0; i < data.length; i++) {
               myRate[i] = parseInt(data[i].rate)
               console.log("rate = ",myRate[i])
               total_rate = total_rate + myRate[i];
              }

              avg_rate = total_rate/i
              this.driverService.setdriverRate(avg_rate,dri_ssn).subscribe(data=>{
                
              })
              console.log(avg_rate)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
    this.getdriSSN();
    this.globalUrl = this.driverService.global.ip
    console.log("url ",this.globalUrl)
  }
  
  setBackButtonAction(){
    this.navCtrl.setRoot(HomePage);
  }

  showDetails(comment_details){
    console.log("comment_details = "+comment_details)
    this.myModal  =  this.modalCtrl.create('CommentdetailPage',{comment_details: comment_details})
    this.myModal.present();
  
  }
}
