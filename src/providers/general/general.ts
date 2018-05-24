import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, ToastController, MenuController } from 'ionic-angular';


/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralProvider {
  private loader;
  private showAlerts = true;


  constructor(public http: Http,private alertCtrl: AlertController, private loadingCtrl: LoadingController, private toastCtrl : ToastController,public _menu : MenuController) {
    console.log('Hello GeneralProvider Provider');
  }

  alerta_generica(title, subTitle, button_ok = "Ok") {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [button_ok]
    });
    if (this.showAlerts) {
        alert.present().then(() => {
        });
    }
  }

  presentLoader(message : string){
    this.loader = this.loadingCtrl.create(
      {
        content: message
      }
    )
    this.loader.present();
  }

  dismissLoader(){
    this.loader.dismiss();
  }

  presentToast(message : string,duration : number,closeButton : boolean){
    let toast = this.toastCtrl.create({message : message , duration: duration, showCloseButton: closeButton , closeButtonText: "X"});
    toast.present();
  }

  menu(){
    console.log('toggle menu');
    this._menu.toggle('mainMenu');
  }

  menuOn(){
    this._menu.enable(true,'mainMenu');
  }

  menuOff(){ 
    this._menu.enable(false,'mainMenu');
  }

  parseArrayString(str : string){
    // []
    let arr = [];

    if (str[0]=='['){
      let _str = str.slice(1);
      if(_str[0]=='['){
        arr.push(this.parseArrayString(_str));
      } else {
        let final = _str.indexOf(']');
        let _arr = _str.slice(0,final).split(',');
        arr.push(_arr);
        if (_str.indexOf(']')!=_str.length+1){
          
        }
      }
    }
  }

}
