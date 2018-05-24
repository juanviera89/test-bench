import * as HighCharts from 'highcharts';
import { CommunicationsProvider } from './../../providers/communications/communications';
import { GeneralProvider } from './../../providers/general/general';
import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Events  } from 'ionic-angular';
declare var cordova: any;

/**
 * Generated class for the TanquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tanque',
  templateUrl: 'tanque.html',
})
export class TanquePage {

  public vaciarVol = 4;
  public myChart;
  public _tanque = 0;
  
    @ViewChild("tanque", {read: ElementRef}) tanque: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,public general : GeneralProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TanquePage');
    this.myChart = HighCharts.chart('graph', {
      legend: {
          enabled: false
      },
        chart: {
          //height: '100%',
          backgroundColor:'rgba(255, 255, 255, 0.002)',

        },
        title: {
        text: ''
        },
        xAxis: {
          labels: {
            style: {
                color: '#FFFFFF',
                fontSize : '0.8em'
            }},
          gridLineColor: '#FFFFFF',
          gridLineWidth: 0.1,
        categories: ['Tanque'],

        plotLines: [{
          color: '#FFF',
          width: 1
        }]
        },
        yAxis: {
          endOnTick: false,
          floor: 0,
          ceiling: 100,
          tickInterval: 1,
          visible: true,
          labels: {
            style: {
                color: '#FFFFFF'
            }},
        title: {
        text: ''
        }
        },
        plotOptions: {
          column: {
              grouping: false,
              shadow: false,
              borderWidth: 0
          }
        },
        series: [
          {
              name: 'Consumo',
              data: [45],
              color: '#FFFFFF',
              type: 'column',
              //pointPadding: 0.3,
              //pointPlacement: -0.2
          },
          {
            name: 'Consumo',
            data: [15.3],
            color: 'rgba(155, 192, 248, 0.71)',
            type: 'column',
            //pointPadding: 0.4,
            //pointPlacement: -0.2
          }
        ]
      });

      cordova.plugins.CordovaMqTTPlugin.subscribe({
        topic:'estanque/3Vo69F/output/volumen',
        qos:2,
       success:(s)=>{
        console.log("subscrito a " + 'estanque/3Vo69F/output/volumen');
        console.log(s);
  
        cordova.plugins.CordovaMqTTPlugin.listen('estanque/3Vo69F/output/volumen',(payload,params) => {
          console.log('got tanque :', payload);
          console.log( payload.split("="));
          console.log((payload).split("=").length)
          this._tanque = Number((payload).split("=")[(payload).split("=").length - 1]);
          this._tanque = this._tanque > 45 ? 45 : this._tanque;
          console.log(this._tanque);
          this.tanque.nativeElement.textContent = this._tanque;
          this.chartPoint();
        });
  
        // ########################################   Nueva Subscripcion ####################################
        
        
        
        // ########################################   ######################## ####################################
  
       },
       error:function(e){
        console.log("error al subscribir");
      
       }
     });
  }

  llenar(){

  }

  vaciar(){

  }

  vaciarVolume(Vol){

  }

  chartPoint(){
    var point = this.myChart.series[1];
    console.log(point);
    console.log(this.myChart);
    point.update({
      data : [this._tanque]
    }); 
  }

}
