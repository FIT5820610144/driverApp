import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { RecordServiceProvider } from '../../providers/record-service/record-service'
import { DriverServiceProvider } from '../../providers/driver-service/driver-service'

/**
 * Generated class for the FinancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finance',
  templateUrl: 'finance.html',
})
export class FinancePage {
  dri_ssn:any
  recordList:any
  noData = false
  showData = true
  total_fare:number
  amount:any
  commission:any;
  comm:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public LoadingCtrl: LoadingController,
    public driverService: DriverServiceProvider,
    public recordService: RecordServiceProvider) {
      this.commission = 10;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinancePage');
    let loading = this.LoadingCtrl.create({
      content: 'Please wait...',
      spinner : 'circles'
    });
    loading.present();

    this.driverService.getDriver()
    .subscribe(data =>{
      this.dri_ssn = data[0].dri_ssn
      console.log("dri_ssn = "+this.dri_ssn)
            this.recordService.getRecord(this.dri_ssn).subscribe(data=>{
            this.recordList = data

            console.log("list = "+this.recordList)
              
               var i = 0;
               var myfare = []
               var total_fare = 0;
               var long = this.recordList
              for (i = 0; i < data.length; i++) {
               myfare[i] = parseInt(data[i].fare)
               total_fare = total_fare + myfare[i];
              }
              this.total_fare = total_fare;
              this.comm = total_fare/this.commission
              console.log("comm = "+this.comm)
              this.amount = this.total_fare-this.comm
              console.log("amount = "+this.amount)
              console.log("total = ",this.total_fare)
                if(isNaN(this.total_fare)){
                  console.log("nodata")
                  this.noData = true;
                  this.showData = false;
                }
          })
          loading.dismiss();
    })
  }
  setBackButtonAction(){
    this.navCtrl.setRoot(HomePage);
  }
}
