import { CommunicationsProvider } from './../../providers/communications/communications';
import { GeneralProvider } from './../../providers/general/general';
import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Events  } from 'ionic-angular';

import * as HighCharts from 'highcharts';

/**
 * Generated class for the RiegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-riego',
  templateUrl: 'riego.html',
})
export class RiegoPage {
  @ViewChild("humedadVal", {read: ElementRef}) humedadVal: ElementRef;
  public myChart;
  public humedad = ['',0];
  public interval;

  //public riego_valor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public general : GeneralProvider, public communication : CommunicationsProvider,public events: Events) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiegoPage');
    this.myChart = HighCharts.chart('graph', {
      legend: {
          enabled: false
      },
        chart: {
          height: '50%',
          backgroundColor:'rgba(255, 255, 255, 0.002)',
          // events : {
          //   load: ( () => {
          //     let _arr = [];
          //     for (var pair of this.humedad) {
          //       _arr.push(pair[1]);
          //     }
          //     return _arr;
          //   })
          // }

        },
        title: {
        text: ''
        },
        xAxis: {
          labels: {
            style: {
                color: '#FFFFFF',
                fontSize : '0.8em'
            }},formatter: function () {
              return (this.value+'').substr(0,2)+':'+(this.value+'').substr(2,2)+':'+(this.value+'').substr(4,2) ;
          },
          gridLineColor: '#FFFFFF',
          gridLineWidth: 0.1,
        //categories: [1030,1031,1032,1033,1034,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044],

        plotLines: [{
          color: '#FFF',
          width: 1
        }]
        },
        yAxis: {
          //tickInterval: 10,
          visible: true,
          labels: {
            style: {
                color: '#FFFFFF'
            }},
        title: {
        text: ''
        }
        },
        series: [
          {
            name: 'Humedad (%)',
            data: [],
            color: 'rgba(255, 255, 255, 0.39)',
            type: 'spline'
            }
        ]
      });

      this.communication.subscribeListening('SimuladorDeRiego/riego/humedad','SimuladorDeRiegoriegoHumedad').then(()=>{
        console.log('me subscribi');
        this.events.subscribe('SimuladorDeRiegoriegoHumedad', (humedad, time) => {
          console.log('got ', humedad, 'at', time);
          this.humedad = [Number(time),Number(humedad)];
          console.log(this.humedad);
          console.log(this.humedad[1]);
          this.humedadVal.nativeElement.textContent = this.humedad[1];
          this.chartAddPoint();
        });
      });

      console.log(this.myChart);
  }

  chartAddPoint(){
    let series = this.myChart.series[0],
    shift = series.data.length > 8; // shift if the series is 
                                        // longer than 20

    // add the point
    this.myChart.series[0].addPoint(this.humedad, true, shift);  
  }

  regar(){

  }

  act(payload,params){
    console.log('ha llegado msj');
    console.log(payload);
    console.log(params);

    let _date = new Date;
    let _time = _date.getHours+':'+_date.getMinutes+':'+_date.getSeconds;
    let _val = Number(payload);
    let _ret = [_time,_val];

    console.log('humedad');
    console.log(_ret);
    return _ret;
    
  }

  

  actII(payload,params){
    console.log('ha llegado msj');
    console.log(payload);
    console.log(params);
  }
}
