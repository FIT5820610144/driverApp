import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ModalController, ModalOptions,ActionSheetController  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
//import { ImagePicker } from '@ionic-native/image-picker';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {  DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  groups:Array<{id:number,name:string}> = [];
  userList: any;
  image_base64: any;
  imageList:any;
  base64Image:string;
  item:any;
  name:any;
  hidecurrentimg = true;
  showcurrentimg = false;
  inTerval:any;
  myModal:any;
  tel:any;
  _url:any
  myImage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public viewController: ViewController,
  public driverService : DriverServiceProvider,
  public LoadingCtrl: LoadingController,
  public alertCtrl: AlertController,
  public http: Http,
  private camera: Camera,
  public modalCtrl: ModalController,
  public actionSheetCtrl: ActionSheetController,
  private emailComposer: EmailComposer) {
    this._url = this.driverService.url
    console.log("url manage = "+this._url)
    //console.log("url manage = "+this.custProvider.url)
    this.imageList = [];
  }

  editImg(){
    const edit = this.alertCtrl.create({
      title: 'infor!!',
      message: 'หากต้องการแก้ไขรูปภาพกรุณาติดต่อแอดมินที่ namaeto@email.com',
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
      edit.present();
  }

  // presentActionSheet() {
  //   const actionSheet = this.actionSheetCtrl.create({
  //     title: 'เลือกรูปภาพ',
  //     buttons: [
  //       {
  //         text: 'กล้อง',
  //        // role: 'destructive',
  //         handler: () => {
  //           this.openCamera();
  //           console.log('กล้อง clicked');
  //         }
  //       },{
  //         text: 'แกลลอรี่',
  //         handler: () => {
  //           this.openGallary();
  //           console.log('แกลลอรี่ clicked');
  //         }
  //       },{
  //         text: 'ยกเลิก',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
    console.log("userList = "+this.userList)
  }

  ionViewWillEnter(){
    let loading = this.LoadingCtrl.create({
      content: 'Please wait...',
      spinner : 'circles'
    });
    loading.present();
    this.driverService.getDriver()
    .subscribe(data =>{
      this.userList = data
      this.tel = data[0].dri_tel
      this.item = data[0].dri_pic
      console.log("dri pic = "+this.item)
      if(data[0].dri_pic == null){
        this.image_base64 = 'http://'+this._url+'/namaetoDB/CustApp/noimg.png'
      }else{
        this.image_base64 = 'http://'+this._url+'/namaetoDB/DriApp/'+data[0].dri_pic
      }
    })
      loading.dismiss();
  }

  setBackButtonAction(){
    this.navCtrl.setRoot(HomePage);
  }

//   openCamera(){
//   let loading = this.LoadingCtrl.create({
//     content: 'Please wait...',
//     spinner : 'circles'
//   });
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
//   }
  
//   this.camera.getPicture(options).then((imageData) => {
//    // imageData is either a base64 encoded string or a file URI
//    // If it's base64 (DATA_URL):
//    this.base64Image = 'data:image/jpeg;base64,' + imageData;
//    this.image_base64 = this.base64Image;
//    this.myImage = imageData
   
//    this.showcurrentimg = true
//    this.hidecurrentimg = false

//    if(this.showcurrentimg == true){
//     //.editImg();
//    }
   
   
//   }, (err) => {
//    // Handle error
//   });
// }

// openGallary(){
//   let loading = this.LoadingCtrl.create({
//     content: 'Please wait...',
//     spinner : 'circles'
//   });
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
//   }
  
//   this.camera.getPicture(options).then((imageData) => {
//    // imageData is either a base64 encoded string or a file URI
//    // If it's base64 (DATA_URL):
//    this.base64Image = 'data:image/jpeg;base64,' + imageData;
//    this.image_base64 = this.base64Image;
//    this.myImage = this.myImage
   
//    this.showcurrentimg = true
//    this.hidecurrentimg = false
   

//    if(this.showcurrentimg == true){
//       //this.editImg();
//       //loading.dismiss();
//    }
   
   
//   }, (err) => {
//    // Handle error
//   });
// }
  
// uploadImg(){
//   let loading = this.LoadingCtrl.create({
//     content: 'กำลังอัพโหลดรูปภาพ',
//     spinner : 'circles'
//   });
//   loading.present();
//   //let url = 'https://514d472c.ngrok.io/namaetoDB/CustApp/uploadimg.php';
//   let url = 'http://'+this._url+'/namaetoDB/DriApp/uploadimg.php';
//   let postData = new FormData();
//   postData.append('file', this.base64Image);
//   let data:Observable<any> = this.http.post(url, postData);
//   data.subscribe((result) => {
//     loading.dismiss();
//     let alert = this.alertCtrl.create({
//       title: 'Info!!',
//       subTitle: 'อัพโหลดรูปภาพสำเร็จ',
//       buttons: [{
//         text: 'ตกลง',
//         handler: data=>{
//           this.navCtrl.setRoot(ProfilePage);
//         }
//       }]
//     });
//     alert.present();
//   })

// }

    editDriver(){
      var editmodal  =  this.modalCtrl.create('EditDriverPage')
      editmodal.present();
    }

}
