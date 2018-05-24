import { PesoPage } from './../pages/peso/peso';
import { MeteorologiaPage } from './../pages/meteorologia/meteorologia';
import { RecirculacionPage } from './../pages/recirculacion/recirculacion';
import { TanquePage } from './../pages/tanque/tanque';
import { RiegoPage } from './../pages/riego/riego';
import { Component,ViewChild } from '@angular/core';
import { Platform ,NavController, Nav, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public _menu : MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goBack(){
    console.log("boton volver")
    this.nav.popToRoot();
    this._menu.toggle("mainMenu");
  }

  toRiego(){ 
    this.nav.popToRoot();
    this.nav.push(RiegoPage);
    this._menu.toggle("mainMenu");
  }

  toTanque(){
    this.nav.popToRoot();

    this.nav.push(TanquePage);
    this._menu.toggle("mainMenu");
  }

  toRecirculacion(){
    this.nav.popToRoot();
    this.nav.push(RecirculacionPage);
    this._menu.toggle("mainMenu");

  }

  toMeteorologia(){
    this.nav.popToRoot();
    this.nav.push(MeteorologiaPage); 
    this._menu.toggle("mainMenu");

  }
  toPeso(){
    this.nav.popToRoot();
    this.nav.push(PesoPage); 
    this._menu.toggle("mainMenu");

  }
}

