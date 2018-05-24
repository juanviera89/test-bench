import { PesoPage } from './../peso/peso';
import { CommunicationsProvider } from './../../providers/communications/communications';
import { MeteorologiaPage } from './../meteorologia/meteorologia';
import { RecirculacionPage } from './../recirculacion/recirculacion';
import { TanquePage } from './../tanque/tanque';
import { RiegoPage } from './../riego/riego';
import { GeneralProvider } from './../../providers/general/general';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public general : GeneralProvider, public communication : CommunicationsProvider) {

  }

  ionViewDidLoad(){
    console.log('enviar mqtt');
    this.communication.connectMQTT("tcp://tecnoandina-server.ddns.net",1883,"tecnoandina",'kennedy5600').then(()=>{
      this.communication.publish('SimuladorDeRiego/conexion','me he conectado');
    })
    
  }
  ionViewDidEnter(){
   this.general.menuOff();
  }

  ionViewDidLeave(){
   this.general.menuOn();
  }

  toRiego(){ 
    this.navCtrl.push(RiegoPage);
  }

  toTanque(){

    this.navCtrl.push(TanquePage);
  }

  toRecirculacion(){
    this.navCtrl.push(RecirculacionPage);

  }

  toMeteorologia(){
    this.navCtrl.push(MeteorologiaPage); 

  }

  toPeso(){
    this.navCtrl.push(PesoPage);

  }
}
