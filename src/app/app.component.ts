import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { VehiclePage } from '../pages/vehicle/vehicle';
import { FinancePage } from '../pages/finance/finance';
import { HistoryPage } from '../pages/history/history';
import { CommentPage } from '../pages/comment/comment';
import { AboutPage } from '../pages/about/about';

import { DriverServiceProvider } from '../providers/driver-service/driver-service'
import { GlobalVariableProvider } from '../providers/global-variable/global-variable'
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  userList: any;
  image_base64: any;
  name:String;
  surname:String;
  tel:any;
  dri_ssn:any
  item: any;
  interval:any
  queueInterval:any
  Interval:any;
  url:any;


  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public driverService: DriverServiceProvider,
    public global: GlobalVariableProvider,
    private storage: Storage,) {
    this.initializeApp();
    this.ionViewDidLoad();
    //this.refresh();

    this.url = this.global.ip

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'ข้อมูลส่วนตัว', component: ProfilePage, icon: "ios-contact" },
      { title: 'ข้อมูลรถ', component: VehiclePage, icon: "car" },
      { title: 'การเงิน', component: FinancePage,  icon: "cash" },
      { title: 'ประวัติการใช้งาน', component: HistoryPage,  icon: "md-list-box" },
      { title: 'ความคิดเห็น', component: CommentPage,  icon: "text" },
      { title: 'เกี่ยวกับ', component: AboutPage,  icon: "ios-help-circle" },
      { title: 'ออกจากระบบ', component: null,  icon: "md-log-out" },
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.component) {
        this.nav.setRoot(page.component);
    } else {
      this.storage.clear().then(()=>{
        this.nav.setRoot(MainPage)
        //window.location.reload();
      });
    }
}

  ionViewDidLoad(){
    const getdriver = setInterval(()=>{
    this.storage.get('driLogon').then((val) => {
      if(val == true) {
          this.getDriver();
        }
      });
    },3000)
  }

  refresh(){
    let interval:number = 1000; // 5 seconds
    let queueInterval = Observable.interval(interval).timeInterval();
    queueInterval.subscribe(() => {
      this.ionViewDidLoad();
      });
      clearInterval(interval)
    }

    getDriver(){
      this.driverService.getDriver()
      .subscribe(data =>{
        this.userList = data,
        this.name = data[0].dri_name;
        this.surname = data[0].dri_surname
        this.tel = data[0].dri_tel;
        this.dri_ssn = data[0].dri_ssn
         if(data[0].dri_pic == null){
           this.image_base64 = 'http://'+this.url+'/namaetoDB/CustApp/noimg.png';
         }else{
           this.image_base64 = 'http://'+this.url+'/namaetoDB/DriApp/'+data[0].dri_pic
         }
      })
    }
}
