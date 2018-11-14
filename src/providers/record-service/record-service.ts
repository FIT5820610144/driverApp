//import { HttpClient } from '@angular/common/http';
import { GlobalVariableProvider } from '../global-variable/global-variable'
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


/*
  Generated class for the RecordServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordServiceProvider {
  url:any
  constructor(public http: Http,public global: GlobalVariableProvider) {
    console.log('Hello RecordServiceProvider Provider');
    this.url = this.global.ip
  }
  getRecord(dri_ssn){
    var url = "http://"+this.url+"/namaetoDB/DriApp/getDriRecord.php";
    let body = new FormData();
    body.append('dri_ssn',dri_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

}
