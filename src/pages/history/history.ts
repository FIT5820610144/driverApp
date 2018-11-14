import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { RecordServiceProvider } from '../../providers/record-service/record-service'

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  dri_ssn:any
  recordList:any
  noData = false
  showData = true
  total_fare:number


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public LoadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public driverService: DriverServiceProvider,
    public recordService: RecordServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  setBackButtonAction(){
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.setRoot(HomePage);
  }
  ionViewWillEnter(){
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

            if(data[0].dri_record == 0){
              console.log("00000")
              this.noData = true
              this.showData = false
            }
      
          })
          loading.dismiss();
    })
  }

  delete(){
    this.driverService.deleteRecord(this.dri_ssn).subscribe(
      data =>{
        if(data.status == "success"){
          let alert = this.alertCtrl.create({
            title: 'Delete!!',
            subTitle: 'ลบข้อมูลเรียบร้อย',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                this.navCtrl.setRoot(HistoryPage)
              }
            }]
          });
          alert.present();
        }
      }
    )
  }

  deleteOne(item){
    console.log("item = "+item);
    this.driverService.deleteArecoard(item).subscribe(
      data =>{
        if(data.status == "success"){
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
          console.log("deleted")
        }
      });
  }

}
