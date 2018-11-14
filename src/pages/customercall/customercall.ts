import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ViewController,App } from 'ionic-angular';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service'
import { HomePage } from '../home/home';

/**
 * Generated class for the CustomercallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customercall',
  templateUrl: 'customercall.html',
})
export class CustomercallPage {
  cust_name:any;cust_surname:any;origin:any;destination:any;distance:any;fare:any
  cust_img:any
  url:any
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public driverService: DriverServiceProvider,
              public toastCtrl:ToastController,
              public viewCtrl:ViewController,
              public app: App) {
              this.url = this.driverService.url
              console.log("myurl = ",this.url)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomercallPage');
    this.getcustomerCall();
  }

  getcustomerCall(){
    this.driverService.getcustomerCalling().subscribe(data=>{
      this.cust_name = data[0].cust_name
      this.cust_surname = data[0].cust_surname
      this.origin = data[0].origin
      this.destination = data[0].destination
      this.distance = data[0].distance
      this.fare = data[0].fare    
      this.cust_img = data[0].cust_img
    })
  }

  accept(){
    this.driverService.getcustomerCalling().subscribe(data=>{
      this.driverService.toAccept(data[0].id_call,'accepted').subscribe(data=>{
          if(data.status = 'success'){
            const toast = this.toastCtrl.create({
              message: 'สำเร็จ เดินทางโดยสวัสดิภาพ',
              duration: 1000,
              position: 'top',
              cssClass: 'toast-success'
            });
            toast.present();
            toast.onDidDismiss(() => {
              this.viewCtrl.dismiss().then(() => {
                this.app.getRootNav().setRoot(HomePage,{accept:'accepted'});
            });
            });
          }
      })
    })
   
  }

  cancle(){
    this.driverService.getcustomerCalling().subscribe(data=>{
    this.driverService.toCancle(data[0].id_call,'cancled').subscribe(data=>{
      if(data.status = 'success'){
        const toast = this.toastCtrl.create({
          message: 'ยกเลิกเรียบร้อยแล้ว',
          duration: 1000,
          position: 'top',
          cssClass: 'toast-success'
        });
        toast.present();
        toast.onDidDismiss(() => {
          this.navCtrl.setRoot(HomePage);
        });
      }
    })
    })
  }
  

}
