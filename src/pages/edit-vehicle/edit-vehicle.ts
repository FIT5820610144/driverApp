import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ViewController,App } from 'ionic-angular';
import { VehiclePage } from '../vehicle/vehicle';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service'

/**
 * Generated class for the EditVehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-vehicle',
  templateUrl: 'edit-vehicle.html',
})
export class EditVehiclePage {
  veh_number:any; veh_brand:any; veh_color:any;veh_type:any;ssn_dri:any

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public driverService: DriverServiceProvider,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditVehiclePage');
    this.getVehicles()
  }

  cancleEdit(){
    this.navCtrl.setRoot(VehiclePage)
  }

  getVehicles(){
    this.driverService.getDriver().subscribe(data=>{
      var dri_ssn = data[0].dri_ssn
      this.ssn_dri = dri_ssn
      this.driverService.getVehicle(dri_ssn).subscribe(data=>{
          console.log("vehicel = ",data)
          this.veh_number = data[0].veh_number
          this.veh_brand = data[0].veh_brand
          this.veh_color = data[0].veh_color
          this.veh_type = data[0].veh_type
      })
    })
   
  }

  edit(event,veh_number,veh_brand,veh_color,veh_type){
    this.driverService.editVehicle(this.ssn_dri,veh_number,veh_brand,veh_color,veh_type).subscribe(data=>{
      console.log("edit = ",data)
      if(data.status == "success"){
        let alert = this.alertCtrl.create({
          title: 'แก้ไขข้อมูล',
          subTitle: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
          buttons: [{
            text: 'ตกลง',
            handler: data=>{
              this.viewCtrl.dismiss().then(() => {
                this.app.getRootNav().setRoot(VehiclePage);
            });
            }
          }]
        });
        alert.present();

      }
    })
  }

}
