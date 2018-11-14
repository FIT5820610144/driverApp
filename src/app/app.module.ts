import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import { Camera } from '@ionic-native/camera';
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { VehiclePage } from '../pages/vehicle/vehicle';
import { FinancePage } from '../pages/finance/finance';
import { HistoryPage } from '../pages/history/history';
import { CommentPage } from '../pages/comment/comment';
import { AboutPage } from '../pages/about/about';
import { RegisterPage } from '../pages/register/register'
import { AddvehiclePage } from '../pages/addvehicle/addvehicle'
import { LoginPage } from '../pages/login/login'
import { MainPage } from '../pages/main/main'

import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DriverServiceProvider } from '../providers/driver-service/driver-service';
import { RecordServiceProvider } from '../providers/record-service/record-service';
import { GlobalVariableProvider } from '../providers/global-variable/global-variable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    VehiclePage,
    FinancePage,
    HistoryPage,
    CommentPage,
    AboutPage,
    RegisterPage,
    AddvehiclePage,
    LoginPage,
    MainPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    VehiclePage,
    FinancePage,
    HistoryPage,
    CommentPage,
    AboutPage,
    RegisterPage,
    AddvehiclePage,
    LoginPage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DriverServiceProvider,
    Camera,
    RecordServiceProvider,
    GlobalVariableProvider,
    Geolocation,
    EmailComposer,
  ]
})
export class AppModule {}
