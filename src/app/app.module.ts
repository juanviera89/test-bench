import { PesoPage } from './../pages/peso/peso';
import { MeteorologiaPage } from './../pages/meteorologia/meteorologia';
import { RecirculacionPage } from './../pages/recirculacion/recirculacion';
import { TanquePage } from './../pages/tanque/tanque';
import { RiegoPage } from './../pages/riego/riego';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GeneralProvider } from '../providers/general/general';
import { CommunicationsProvider } from '../providers/communications/communications';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RiegoPage,
    TanquePage,
    RecirculacionPage,
    MeteorologiaPage,
    PesoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RiegoPage,
    TanquePage,
    RecirculacionPage,
    MeteorologiaPage,
    PesoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeneralProvider,
    CommunicationsProvider
  ]
})
export class AppModule {}
