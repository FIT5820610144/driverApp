import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddvehiclePage } from '../addvehicle/addvehicle';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  next($event,dri_ssn,dri_name,dri_surname,dri_email,dri_tel){
    
    this.navCtrl.push(AddvehiclePage,{dri_ssn:dri_ssn,
                                      dri_name:dri_name,
                                      dri_surname:dri_surname,
                                      dri_email:dri_email,
                                      dri_tel:dri_tel},)
  }

  login(){
    this.navCtrl.pop()
  }

}
