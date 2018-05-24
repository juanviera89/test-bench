import { CommunicationsProvider } from './../../providers/communications/communications';
import { GeneralProvider } from './../../providers/general/general';
import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Events  } from 'ionic-angular';
declare var cordova: any;
/**
 * Generated class for the RecirculacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recirculacion',
  templateUrl: 'recirculacion.html',
})
export class RecirculacionPage {

  public presion = 12;

  public _presion = 0;
  public _flujo = 0;
  public _corriente = 0;

  @ViewChild("presionElem", {read: ElementRef}) presionElem: ElementRef;
  @ViewChild("flujo", {read: ElementRef}) flujo: ElementRef;
  @ViewChild("corriente", {read: ElementRef}) corriente: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public general : GeneralProvider, public communication : CommunicationsProvider,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecirculacionPage');

    cordova.plugins.CordovaMqTTPlugin.subscribe({
      topic:'recirculacion/8tg8ql/OUTPUT/presion',
      qos:2,
     success:(s)=>{
      console.log("subscrito a " + 'recirculacion/8tg8ql/OUTPUT/presion');
      console.log(s);

      cordova.plugins.CordovaMqTTPlugin.listen('recirculacion/8tg8ql/OUTPUT/presion',(payload,params) => {
        console.log('got presion :', payload);
        this._presion = Number(payload);
        console.log(this._presion);
        this.presionElem.nativeElement.textContent = this._presion;
      });

      // ########################################   Nueva Subscripcion ####################################
      
      cordova.plugins.CordovaMqTTPlugin.subscribe({
        topic:'recirculacion/8tg8ql/OUTPUT/flujo',
        qos:2,
       success:(s)=>{
        console.log("subscrito a " + 'recirculacion/8tg8ql/OUTPUT/flujo');
        console.log(s);
  
        cordova.plugins.CordovaMqTTPlugin.listen('recirculacion/8tg8ql/OUTPUT/flujo',(payload,params) => {
          console.log('got flujo :', payload);
          this._flujo = Number(payload);
          console.log(this._flujo);
          this.flujo.nativeElement.textContent = this._flujo;
        });
  
        // ########################################   Nueva Subscripcion ####################################
        
        cordova.plugins.CordovaMqTTPlugin.subscribe({
          topic:'recirculacion/8tg8ql/OUTPUT/corriente',
          qos:2,
         success:(s)=>{
          console.log("subscrito a " + 'recirculacion/8tg8ql/OUTPUT/corriente');
          console.log(s);
    
          cordova.plugins.CordovaMqTTPlugin.listen('recirculacion/8tg8ql/OUTPUT/corriente',(payload,params) => {
            console.log('got corriente :', payload);
            this._corriente = Number(payload);
            console.log(this._corriente);
            this.corriente.nativeElement.textContent = this._corriente;
          });
    
          // ########################################   Nueva Subscripcion ####################################
          
          
          
          // ########################################   ######################## ####################################
    
         },
         error:function(e){
          console.log("error al subscribir");
        
         }
       });
        
        // ########################################   ######################## ####################################
  
       },
       error:function(e){
        console.log("error al subscribir");
      
       }
     });
      
      // ########################################   ######################## ####################################

     },
     error:function(e){
      console.log("error al subscribir");
    
     }
   });
  }



  ajustarPresion(presion){

  }

  on(){

  }

  off(){

  }

}
