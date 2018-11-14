import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalVariableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalVariableProvider {
  public ip:any
  constructor(public http: Http) {
    console.log('Hello GlobalVariableProvider Provider');
    this.ip = 'localhost';
  }

}
