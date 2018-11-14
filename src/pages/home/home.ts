import { Component } from '@angular/core';
import { NavController,ToastController,ModalController,NavParams,ViewController,App,AlertController } from 'ionic-angular';
import { DriverServiceProvider } from '../../providers/driver-service/driver-service';
import { Geolocation } from '@ionic-native/geolocation';
declare var google
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Start:any;End:any
  active:Boolean = true;
  myModal:any
  interval:any;
  dri_ssn:any;
  modallDissmiss:any = false
  status:any = true
  accept:any
  cust_name:any;cust_surname:any;cust_origin
  pickup_button:any = false;
  finish_button:any = false
  url:any;
  cust_img:any
  cust_data:any
  dri_lat:any
  dri_lng:any
  cust_dest:any

  constructor(public navCtrl: NavController,
              public driverService: DriverServiceProvider,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public param: NavParams,
              public viewCtrl:ViewController,
              public app: App,
              public alertCtrl: AlertController,
              public geolocation: Geolocation) {
              this.url = this.driverService.url

  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("dri lat = ",resp.coords.latitude)
      console.log("dri lng = ",resp.coords.longitude)
      this.dri_lat = resp.coords.latitude
      this.dri_lng = resp.coords.longitude
      this.calculateAndDisplayRoute(resp.coords.latitude,resp.coords.longitude)
      this.driverService.getDriver().subscribe(data=>{
        const custCallingITV = setInterval(()=>{
        this.driverService.saveLatLng(data[0].dri_ssn,resp.coords.latitude,resp.coords.longitude)
        .subscribe(data=>{})
        },5000)

      })
     
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getCallingDetails(){
    this.driverService.getCalling().subscribe(data=>{
      this.cust_data = data
      if(data != 0){
       
      console.log("origin ",data[0].origin)
      var org = data[0].origin
      var dest = data[0].destination
      //console.log("cust_org = ",cust_org)
      //console.log("cust_dest = ",cust_dest)
      this.cust_name = data[0].cust_name;
      this.cust_surname = data[0].cust_surname;
      this.cust_origin = data[0].origin;
      this.cust_dest = dest;
      this.cust_img = data[0].cust_img
      console.log("cust img = ",this.cust_img)
      //this.calculateAndDisplayRoute(org,dest)
      //this.calculateAndDisplayRoute(this.Start,this.End)
      console.log("destination ",data[0].destination)
    }else{
      console.log("data = 0")
    }
    })
  }

  
  getDrivers(){
    this.driverService.getDriver().subscribe(data=>{
      console.log("ssn = ",data[0].dri_ssn)
      this.dri_ssn = data[0].dri_ssn
    })
  }

  calculateAndDisplayRoute(clat,clng) {  
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var firstPosition = {lat:clat,lng:clng};
       // var origin = {lat:clat,lng:clng};
        //var destination = clng;
        var cust_origin = this.cust_origin
        
        // this.getaccept = setInterval(()=>{
        //   var distance = localStorage.getItem("km");
        //   this.distance = distance;
        //  },100)

            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: firstPosition,
              zoomControl:false,
              mapTypeControl:false,
              streetViewControl: false,
              streetView:false,
              disableDefaultUI: true
            });

        var marker = new google.maps.Marker({
          position: firstPosition,
          map: map,
          icon: 'assets/imgs/pin.png',
        });
         
     
       directionsDisplay.setMap(map);
       var acceptSts = this.param.get('accept');
       console.log("acceptSts = ",acceptSts)
       console.log("cust_origin = ",this.cust_origin)

       if(acceptSts == 'accepted'){

       directionsService.route({
        origin: firstPosition,
        destination: cust_origin,
        travelMode: 'DRIVING',
      }, function (response, status){
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
          // var getDistance = response.routes[0].legs[0].distance.value
          
          // this.distance = getDistance;
          // var getKm = getDistance/1000
          // var km = getKm.toFixed(0);
          // localStorage.setItem("km", km);
          // localStorage.setItem("place", "place");
        } else {
          window.alert('ไม่สามารถค้นหาเส้นทางที่ท่านได้ระบุ ' + status);
          // localStorage.setItem("place", "noplace");
        }
  }); 

}
  }

  pickupLocation(clat,clng){
    var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var firstPosition = {lat:clat,lng:clng};
        var origin = clat;
        var destination = clng;
        //var cust_origin = this.cust_origin
        
        // this.getaccept = setInterval(()=>{
        //   var distance = localStorage.getItem("km");
        //   this.distance = distance;
        //  },100)

            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: firstPosition,
              zoomControl:false,
              mapTypeControl:false,
              streetViewControl: false,
              streetView:false,
              disableDefaultUI: true
            });

        var marker = new google.maps.Marker({
          position: firstPosition,
          map: map,
          icon: 'assets/imgs/pin.png',
        });
         
     
       directionsDisplay.setMap(map);

       directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
      }, function (response, status){
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
          // var getDistance = response.routes[0].legs[0].distance.value
          
          // this.distance = getDistance;
          // var getKm = getDistance/1000
          // var km = getKm.toFixed(0);
          // localStorage.setItem("km", km);
          // localStorage.setItem("place", "place");
        } else {
          window.alert('ไม่สามารถค้นหาเส้นทางที่ท่านได้ระบุ ' + status);
          // localStorage.setItem("place", "noplace");
        }
  }); 

  }

  
  ionViewDidEnter(){
    console.log("hello homepage")
    this.getCallingDetails();
    this.customerCalling();
    this.getDrivers();
    this.getCurrentPosition();
    //this.setDirectionAcc()
    this.accept = this.param.get('accept')
    console.log("accepted = ",this.accept)
    if(this.accept == 'accepted'){
     // this.setDirectionAcc()
      this.getCurrentPosition();
      this.customerCancle();
      this.modallDissmiss = true;
      this.pickup_button = true;
      this.status = false
    }
  
  }
  
  setActive($event){
    console.log(this.active)
    this.driverService.getDriver().subscribe(data=>{
      console.log("dri ssn = ",data[0].dri_ssn)
      this.driverService.tosetActive(data[0].dri_ssn,this.active)
      .subscribe(data=>{
        console.log(data)
        if(data.status == 'success'){
          const toast = this.toastCtrl.create({
            message: 'เรียบร้อย',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
      })
    })
  }

  

  calling(){
    this.customerCalling();
  }

  customerCalling(){
    this.myModal =  this.modalCtrl.create('CustomercallPage')
      const custCallingITV = setInterval(()=>{
      //data[0].dri_ssn = this.dri_ssn && 
      this.driverService.getcustomerCalling().subscribe(data=>{
        //console.log(data)
        console.log("call_status1 = ",data[0].call_status)
        //console.log(data[0].dri_action)
        //console.log("myssn = ",this.dri_ssn)
        if(data[0].dri_ssn == this.dri_ssn && data[0].call_status == '1' && data[0].dri_action == '0'){
          this.myModal.present();
          clearInterval(custCallingITV);
        }
      })
      if(this.accept == 'accepted'){
        clearInterval(custCallingITV);
      }

      },3000)
  }

  pickUp(){
    const confirm = this.alertCtrl.create({
      title: 'Pick UP!!',
      message: 'ยืนยันการเรียกลูกค้า',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
           // console.log('Disagree clicked');
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.driverService.getcustomerCalling().subscribe(data=>{
              this.driverService.driverPickup(data[0].id_call,1).subscribe(data=>{
                  console.log("pickup = ",data)
                  if(data.status == 'success'){
                    console.log("สำเร็จ")
                    console.log("pick orgin = ",this.cust_origin)
                    console.log("pick dest = ",this.cust_dest)
                    this.pickupLocation(this.cust_origin,this.cust_dest)
                  }
              })
            })
            this.pickup_button = false
            this.finish_button = true
          }
        }
      ]
    });
    confirm.present();
  }

  finish(){
    const confirm = this.alertCtrl.create({
      title: 'Finish!!',
      message: 'ยืนยันการเรียกรถเสร็จสิ้น',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
           // console.log('Disagree clicked');
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.driverService.getcustomerCalling().subscribe(data=>{
              this.driverService.toFinish(data[0].id_call,'finished').subscribe(data=>{
              })
            })
            this.navCtrl.setRoot(HomePage)
          }
        }
      ]
    });
    confirm.present();
  }

  customerCancle(){
    let cancleInter = setInterval(()=>{
      this.driverService.getcustomerCalling().subscribe(data=>{
        console.log("cancle2 = ",data[0].cust_cancle)
        if(data[0].cust_cancle == 1){
          const confirm = this.alertCtrl.create({
            title: 'cancle',
            message: 'ลูกค้าได้ยกเลิกการเรียกรถ!!',
            buttons: [
              {
                text: 'ตกลง',
                handler: () => {
                  this.driverService.getcustomerCalling().subscribe(data=>{
                    this.driverService.toFinish(data[0].id_call,'finished').subscribe(data=>{
                    })
                  })
                  this.navCtrl.setRoot(HomePage)
                }
              }]
            })
            confirm.present();
            clearInterval(cancleInter)
          
        }
      })
    },3000)
  }

}
