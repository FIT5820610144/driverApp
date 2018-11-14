import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ViewController,App,AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service'
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  showOta:Boolean = false

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public driverService: DriverServiceProvider,
              private storage: Storage,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              public app: App,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin($event,tel){
    this.driverService.toLogin(tel)
    .subscribe(data=>{
      console.log(data)
      if(data.status == "success"){
        this.storage.set('driLogon',true);
        this.storage.set('getTel',tel)
        
        const toast = this.toastCtrl.create({
          message: 'เข้าสู่ระบบสำเร็จ',
          duration: 1000,
          position: 'top',
          cssClass: 'toast-success'
        });
        toast.present();
        toast.onDidDismiss(() => {
          this.navCtrl.setRoot(HomePage)
        //   this.viewCtrl.dismiss().then(() => {
        //     this.app.getRootNav().setRoot(HomePage);
        // });
        });
        //window.location.reload();

      }else if(data.status == 'new'){
        const newuser = this.alertCtrl.create({
          title: 'ไม่สามารถเข้าสู่ระบบได้!!',
          message: 'กรุณารอการยืนยันจากแอดมินทางอีเมล์ แล้วเข้าสู่ระบบอีกครั้ง',
          buttons: [
            {
              text: 'ตกลง',
              handler: () => {
                this.driverService.getcustomerCalling().subscribe(data=>{
                  this.driverService.toFinish(data[0].id_call,'finished').subscribe(data=>{
                  })
                })
                //this.navCtrl.setRoot(HomePage)
              }
            }]
          })
          newuser.present();

      }else if(data.status == 'banned'){
        const confirm = this.alertCtrl.create({
          title: 'ไม่สามารถเข้าสู่ระบบได้!!',
          message: 'คุณถูกระงับการใช้งาน กรุณาติดต่อแอดมินทาง <br><b>namaeto@email.com</b>',
          buttons: [
            {
              text: 'ตกลง',
              handler: () => {
                this.driverService.getcustomerCalling().subscribe(data=>{
                  this.driverService.toFinish(data[0].id_call,'finished').subscribe(data=>{
                  })
                })
                //this.navCtrl.setRoot(HomePage)
              }
            }]
          })
          confirm.present();
        }else {
        const toast = this.toastCtrl.create({
          message: 'เข้าสู่ระบบไม่สำเร็จ',
          duration: 3000,
          position: 'top',
          cssClass: 'toast-fail'
        });
        toast.present();
        toast.onDidDismiss(() => {
         /// this.navCtrl.setRoot(HomePage);
        });
      }

    })
    
    this.showOta = true;
  }

  register(){
    this.navCtrl.push(RegisterPage)
  }

}
