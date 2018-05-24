import { CommunicationsProvider } from './../../providers/communications/communications';
import { GeneralProvider } from './../../providers/general/general';
import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Events  } from 'ionic-angular';
import * as HighCharts from 'highcharts';
declare var cordova: any;
/**
 * Generated class for the MeteorologiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meteorologia',
  templateUrl: 'meteorologia.html',
})
export class MeteorologiaPage {
  //public myChart;
  public _direccion = 150;
  public _viento = 0;
  public _presion = 0;
  public _lluviaDia = 0;
  public _humedad = 0;
  public _temperatura = 0;
  public _lluvia = 0;

  @ViewChild("direccion", {read: ElementRef}) direccion: ElementRef;
  @ViewChild("viento", {read: ElementRef}) viento: ElementRef;
  @ViewChild("presion", {read: ElementRef}) presion: ElementRef;
  @ViewChild("lluvia", {read: ElementRef}) lluvia: ElementRef;
  @ViewChild("lluviaDia", {read: ElementRef}) lluviaDia: ElementRef;
  @ViewChild("humedad", {read: ElementRef}) humedad: ElementRef;
  @ViewChild("temperatura", {read: ElementRef}) temperatura: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public general : GeneralProvider, public communication : CommunicationsProvider,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeteorologiaPage');

      /* this.myChart = HighCharts.chart('graph', {
        legend: {
            enabled: false
        },
          chart: {
            height: '40%',
            backgroundColor:'rgba(255, 255, 255, 0.002)',

          },
          title: {
            text: 'Lluvia por dia (m3)',
            style: {
              color: '#6B8EFB',
              fontSize : '1em'
            }
          },
          xAxis: {
            labels: {
              style: {
                  color: '#6B8EFB',
                  fontSize : '0.8em'
              }},
            gridLineColor: '#BECEFF',
            gridLineWidth: 0.1,
          categories: ['03-11','04-11','05-11','06-11','07-11','08-11'],

          plotLines: [{
            color: '#BECEFF',
            width: 1
          }]
          },
          yAxis: {
            endOnTick: false,
            tickInterval: 0.1,
            visible: true,
            labels: {
              style: {
                  color: '#6B8EFB'
              }},
          title: {
            text: '',
            style: {
              color: '#6B8EFB',
              fontSize : '0.8em'
            }
          }
          },
          series: [
            {
              name: 'Lluvia m3',
              data: [0.4,0,0.1,1.2,0.5,0.8],
              color: '#6B8EFB',
              type: 'spline'
              }
          ]
      }); */
  
      // this.suscribe('METEO/8tg8ql/OUTPUT/presion','METEO8tg8qlOUTPUTpresion',this._presion,this.presion);
      // this.suscribe('METEO/8tg8ql/OUTPUT/velViento','METEO8tg8qlOUTPUTvelViento',this._viento,this.viento);
      // this.suscribe('METEO/8tg8ql/OUTPUT/lluviaDia','METEO8tg8qlOUTPUTlluviaDia',this._lluviaDia,this.lluviaDia);
      // this.suscribe('METEO/8tg8ql/OUTPUT/humedad','METEO8tg8qlOUTPUThumedad',this._humedad,this.humedad);
      // this.suscribe('METEO/8tg8ql/OUTPUT/temperatura','METEO8tg8qlOUTPUTtemperatura',this._temperatura,this.temperatura);
      // this.suscribe('METEO/8tg8ql/OUTPUT/lluvia','METEO8tg8qlOUTPUTlluvia',this._lluvia,this.lluvia);


      cordova.plugins.CordovaMqTTPlugin.subscribe({
        topic:'METEO/8tg8ql/OUTPUT/lluvia',
        qos:2,
       success:(s)=>{
        console.log("subscrito a " + 'METEO/8tg8ql/OUTPUT/lluvia');
        console.log(s);

        cordova.plugins.CordovaMqTTPlugin.listen('METEO/8tg8ql/OUTPUT/lluvia',(payload,params) => {
          console.log('got lluvia :', payload);
          this._lluvia = Number(payload);
          console.log(this._lluvia);
          this.lluvia.nativeElement.textContent = this._lluvia;
        });

        // ########################################   Nueva Subscripcion ####################################
        
        cordova.plugins.CordovaMqTTPlugin.subscribe({
          topic:'METEO/8tg8ql/OUTPUT/temperatura',
          qos:2,
         success:(s)=>{
          console.log("subscrito a " + 'METEO/8tg8ql/OUTPUT/temperatura');
          console.log(s);
  
          cordova.plugins.CordovaMqTTPlugin.listen('METEO/8tg8ql/OUTPUT/temperatura',(payload,params) => {
            console.log('got temperatura :', payload);
            this._temperatura = Number(payload);
            console.log(this._temperatura);
            this.temperatura.nativeElement.textContent = this._temperatura;
          });
  
          // ########################################   Nueva Subscripcion ####################################
          
          cordova.plugins.CordovaMqTTPlugin.subscribe({
            topic:'METEO/8tg8ql/OUTPUT/humedad',
            qos:2,
           success:(s)=>{
            console.log("subscrito a " + 'METEO/8tg8ql/OUTPUT/humedad');
            console.log(s);
    
            cordova.plugins.CordovaMqTTPlugin.listen('METEO/8tg8ql/OUTPUT/humedad',(payload,params) => {
              console.log('got humedad :', payload);
              this._humedad = Number(payload);
              console.log(this._humedad);
              this.humedad.nativeElement.textContent = this._humedad;
            });
    
            // ########################################   Nueva Subscripcion ####################################
            
            cordova.plugins.CordovaMqTTPlugin.subscribe({
              topic:'METEO/8tg8ql/OUTPUT/velViento',
              qos:2,
             success:(s)=>{
              console.log("subscrito a " + 'METEO/8tg8ql/OUTPUT/velViento');
              console.log(s);
      
              cordova.plugins.CordovaMqTTPlugin.listen('METEO/8tg8ql/OUTPUT/velViento',(payload,params) => {
                console.log('got velViento :', payload);
                this._viento = Number(payload);
                console.log(this._viento);
                this.viento.nativeElement.textContent = this._viento;
              });
      
              // ########################################   Nueva Subscripcion ####################################
              
              cordova.plugins.CordovaMqTTPlugin.subscribe({
                topic:'METEO/8tg8ql/OUTPUT/presion',
                qos:2,
               success:(s)=>{
                console.log("subscrito a " + 'METEO/8tg8ql/OUTPUT/presion');
                console.log(s);
        
                cordova.plugins.CordovaMqTTPlugin.listen('METEO/8tg8ql/OUTPUT/presion',(payload,params) => {
                  console.log('got presion :', payload);
                  this._presion = Number(payload);
                  console.log(this._presion);
                  this.presion.nativeElement.textContent = this._presion;
                });
        
                // ########################################   Nueva Subscripcion ####################################
                
                cordova.plugins.CordovaMqTTPlugin.subscribe({
                  topic:'METEO/8tg8ql/OUTPUT/dirViento',
                  qos:2,
                 success:(s)=>{
                  console.log("subscrito a " + 'METEO/8tg8ql/OUTPUT/dirViento');
                  console.log(s);
          
                  cordova.plugins.CordovaMqTTPlugin.listen('METEO/8tg8ql/OUTPUT/dirViento',(payload,params) => {
                    console.log('got dirViento :', payload);
                    //this._direccion = Number((payload+'').split(',')[1]);
                    this._direccion = Number(payload);
                    console.log(this._direccion);
                    this.direccion.nativeElement.style =  "transform:rotate("+this._direccion+"deg)" ;
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

    suscribe(topic,event,_var,htmlElem){
      this.communication.subscribeListening(topic,event).then(()=>{
        console.log('me subscribi');
        this.events.subscribe(event, (data, time) => {
          console.log('got '+data+ 'at', time);
          _var = [Number(time),Number(data)];
          console.log(_var);
          console.log(_var[1]);
          htmlElem.nativeElement.textContent = _var[1];
        });
      });

    }

}
