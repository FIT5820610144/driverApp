import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ViewController,App } from 'ionic-angular';
import {  DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the EditDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-driver',
  templateUrl: 'edit-driver.html',
})
export class EditDriverPage {
  dri_name:any;dri_surname:any;dri_email:any;dri_tel:any;dri_ssn:any
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public driverService : DriverServiceProvider,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDriverPage');
    this.getDriver();
  }

  getDriver(){
    this.driverService.getDriver().subscribe(data=>{
      console.log("driver = ",data)
      this.dri_ssn = data[0].dri_ssn
      this.dri_name = data[0].dri_name;
      this.dri_surname = data[0].dri_surname
      this.dri_email = data[0].dri_email
      this.dri_tel = data[0].dri_tel
    })
  }

  edit(event,dri_name,dri_surname,dri_email,dri_tel){
    console.log("name for html = " + name)
      this.driverService.editDriver(this.dri_ssn,dri_name,dri_surname,dri_email,dri_tel).subscribe(data=>{
          console.log("edit = ",data)
          if(data.status == "success"){
            let alert = this.alertCtrl.create({
              title: 'แก้ไขข้อมูล',
              subTitle: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
              buttons: [{
                text: 'ตกลง',
                handler: data=>{
                  this.viewCtrl.dismiss().then(() => {
                    this.app.getRootNav().setRoot(ProfilePage);
                });
                }
              }]
            });
            alert.present();
  
          }
      })
    
  }

  cancleEdit(){
    this.navCtrl.setRoot(ProfilePage)
  }

}
