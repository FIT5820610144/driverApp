import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';

/**
 * Generated class for the VehiclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {
  vehicleList:any;
  type:any;
  dri_ssn:any
  type_img:any
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public driverService : DriverServiceProvider,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclePage');
    //this.vehicleData();
    this.getdriSSN();

  }
  setBackButtonAction(){
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  getdriSSN(){
    this.driverService.getDriver().subscribe(data=>{
     var dri_ssn = data[0].dri_ssn;
      console.log("ssn = ",dri_ssn)
      this.vehicleData(dri_ssn)
    })
  }
  vehicleData(dri_ssn){
    this.driverService.getVehicle(dri_ssn).subscribe(data =>{
        this.vehicleList = data
        this.type = data[0].veh_type;
        if(data[0].veh_type == 'ตุ๊กตุ๊ก'){
          console.log("ตุ๊กๆ")
          this.type_img = 'tuktuk.png'
        }else{
          this.type_img = 'moto.png'
        }
        console.log("type = "+this.type)
    })
  }

  
  editVehicle(){
    var editmodal  =  this.modalCtrl.create('EditVehiclePage')
    editmodal.present();
  }
}
