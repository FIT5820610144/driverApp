import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service'
import { LoginPage } from '../login/login';

/**
 * Generated class for the AddvehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addvehicle',
  templateUrl: 'addvehicle.html',
})
export class AddvehiclePage {
  dri_ssn:any;
  dri_name:any;
  dri_surname:any;
  dri_email:any;
  dri_tel:any;
  mydata:any
  veh_status:any;
  dri_status:any;
  dri_new:any = 1;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private storage: Storage,
     public driverService: DriverServiceProvider,
     private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddvehiclePage');
  }

  register($event,veh_number,veh_brand,veh_color,veh_type){
      console.log(veh_number)
      console.log(veh_brand)
      console.log(veh_color)
      console.log(veh_type)
      this.addDriver();
      this.driverService.addVehicles(veh_number,veh_brand,veh_color,veh_type,this.dri_ssn)
      .subscribe(data => {
        console.log("vehicles = ",data)
        if(data = 'success'){
           let alert = this.alertCtrl.create({
            title: 'ลงทะเบียนสำเร็จ',
            subTitle: 'กรุณารอการยืนยันอีเมล์จากแอดมิน เพื่อเข้าใช้งานแอพพลิเคชั่น',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                this.navCtrl.setRoot(LoginPage);
              }
            }]
          });
          alert.present();
        }
      })
      
  }

  addDriver(){
    this.dri_ssn = this.navParams.get('dri_ssn');
    this.dri_name = this.navParams.get('dri_name');
    this.dri_surname = this.navParams.get('dri_surname');
    this.dri_email = this.navParams.get('dri_email');
    this.dri_tel = this.navParams.get('dri_tel');


    console.log("ssn = ",this.dri_ssn)
    console.log("name = ",this.dri_name)

    this.driverService.addDrivers(this.dri_ssn,this.dri_name,this.dri_surname,this.dri_email,this.dri_tel,this.dri_new)
    .subscribe(data=>{
      console.log("driver = ",data)
      this.dri_status = data
    })
  }

  back(){
    this.navCtrl.pop();
  }

}
