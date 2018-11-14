//import { HttpClient } from '@angular/common/http';
import { GlobalVariableProvider } from '../global-variable/global-variable'
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the DriverServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DriverServiceProvider {
  url:string
  _url = 'localhost'
  constructor(public http: Http,public global: GlobalVariableProvider) {
    console.log('Hello DriverServiceProvider Provider');
    this.url = this.global.ip 
    console.log("ip = "+this.url)
    this._url = "http://"+this.url+"/namaetoDB/DriApp/getDriver.php";
  }


  getDriver(){
    return this.http.get(this._url)
           .map((response:Response)=> response.json());
   }

   getVehicle(dri_ssn){
     console.log("ssn pro = ",dri_ssn)
    var url =   "http://"+this.url+"/namaetoDB/DriApp/getVehicle.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  
   }

  getComment(dri_ssn){
    var url =   "http://"+this.url+"/namaetoDB/DriApp/getComment.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  
  }

  addDrivers(dri_ssn,dri_name,dri_surname,dri_email,dri_tel,dri_new){
    var url = "http://"+this.url+"/namaetoDB/DriApp/addDriver.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);
    body.append('dri_name',dri_name);
    body.append('dri_surname',dri_surname);
    body.append('dri_email',dri_email);
    body.append('dri_tel',dri_tel);
    body.append('dri_new',dri_new);
    

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;

  }

  addVehicles(veh_number,veh_brand,veh_color,veh_type,dri_ssn){
    var url = "http://"+this.url+"/namaetoDB/DriApp/addVehicle.php";
    let body = new FormData();
    body.append('veh_number',veh_number);
    body.append('veh_brand',veh_brand);
    body.append('veh_color',veh_color);
    body.append('veh_type',veh_type);
    body.append('dri_ssn',dri_ssn);
    

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;

  }

  toLogin(dri_tel){
    var url = "http://"+this.url+"/namaetoDB/DriApp/login.php";
    let body = new FormData();
    body.append('dri_tel',dri_tel);
    

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  tosetActive(dri_ssn,dri_active){
    var url =   "http://"+this.url+"/namaetoDB/DriApp/setDriverActive.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);
    body.append('dri_active',dri_active);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  getCalling(){
    return this.http.get("http://"+this.url+"/namaetoDB/DriApp/accepted.php")
    .map((response:Response)=> response.json());
  }

  getcustomerCalling(){
    return this.http.get("http://"+this.url+"/namaetoDB/DriApp/customerCall.php")
    .map((response:Response)=> response.json());
  }

  setdriverRate(dri_rate,dri_ssn){
    var url =   "http://"+this.url+"/namaetoDB/DriApp/setdriverRate.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);
    body.append('dri_rate',dri_rate);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  toAccept(id_call,dri_accept){
    var url =   "http://"+this.url+"/namaetoDB/DriApp/toAccept.php";
    let body = new FormData();
    body.append('id_call',id_call);
    body.append('dri_accept',dri_accept);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  toCancle(id_call,dri_cancle){
    var url =   "http://"+this.url+"/namaetoDB/DriApp/toCancle.php";
    let body = new FormData();
    body.append('id_call',id_call);
    body.append('dri_cancle',dri_cancle);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  driverPickup(id_call,dri_pickup){
    console.log("pick = ",dri_pickup)
    var url =   "http://"+this.url+"/namaetoDB/DriApp/toPickup.php";
    let body = new FormData();
    body.append('id_call',id_call);
    body.append('dri_pickup',dri_pickup);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  toFinish(id_call,dri_finish){
    var url =   "http://"+this.url+"/namaetoDB/DriApp/toFinish.php";
    let body = new FormData();
    body.append('id_call',id_call);
    body.append('dri_finish',dri_finish);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  saveLatLng(dri_ssn,dri_lat,dri_lng){
    console.log("dri_ssn = ",dri_ssn)
    var url =   "http://"+this.url+"/namaetoDB/DriApp/setdriverLatLng.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);
    body.append('dri_lat',dri_lat);
    body.append('dri_lng',dri_lng);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  editDriver(dri_ssn,dri_name,dri_surname,dri_email,dri_tel){
    var url = "http://"+this.url+"/namaetoDB/DriApp/editDriver.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);
    body.append('dri_name',dri_name);
    body.append('dri_surname',dri_surname);
    body.append('dri_email',dri_email);
    body.append('dri_tel',dri_tel);
    
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  editVehicle(dri_ssn,veh_number,veh_brand,veh_color,veh_type){
    var url = "http://"+this.url+"/namaetoDB/DriApp/editVehicle.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);
    body.append('veh_number',veh_number);
    body.append('veh_brand',veh_brand);
    body.append('veh_color',veh_color);
    body.append('veh_type',veh_type);
    
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }


  deleteRecord(dri_ssn){
    //var ssn = cust_ssn
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://"+this.url+"/namaetoDB/DriApp/deleteDriRecord.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  deleteArecoard(cr_number){
    //var ssn = cust_ssn
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://"+this.url+"/namaetoDB/DriApp/deleteDriRecord.php";
    let body = new FormData();
    body.append('cr_number',cr_number);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

}
