import { CommunicationsProvider } from './../../providers/communications/communications';
import { GeneralProvider } from './../../providers/general/general';
import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,Events  } from 'ionic-angular';
import {Highcharts} from 'highcharts-more-node'

declare var cordova: any;
/**
 * Generated class for the PesoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-peso',
  templateUrl: 'peso.html',
})
export class PesoPage {

  public myChart;
  public peso = 90;
  public displayStr = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public general : GeneralProvider, public communication : CommunicationsProvider,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesoPage');
      this.myChart = Highcharts.chart('graphG', {
        
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height: '80%',
                backgroundColor:'rgba(255, 255, 255, 0.002)',
            },
        
            title: {
                text: '',
                enabled: false
            },
        
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
        
            // the value axis
            yAxis: {
                min: 0,
                max: 300,
        
                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',
        
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'kg'
                },
                plotBands: [{
                    from: 0,
                    to: 100,
                    color: '#55BF3B' // green
                }, {
                    from: 100,
                    to: 200,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 200,
                    to: 300,
                    color: '#DF5353' // red
                }]
            },
        
            series: [{
                name: 'Speed',
                data: [this.peso],
                tooltip: {
                    valueSuffix: ' kg'
                }
            }]
        
        });
  
        this.communication.subscribeListening('silosSago/XQDD7E/pesoTotal','silosSagoXQDD7EpesoTotal').then(()=>{
          console.log('me subscribi');
          this.events.subscribe('silosSagoXQDD7EpesoTotal', (peso, time) => {
            console.log('got peso ', peso, 'at', time);
            this.peso = Number(peso);
            if (this.peso<0) this.peso = 0;
            console.log(this.peso);
            console.log(this.peso);
            //this.peso.nativeElement.textContent = this.peso[1];
            this.chartPoint();
          });
        });
  }

  chartPoint(){
    var point = this.myChart.series[0].points[0];

    point.update(this.peso); 
  }

  setDisplay(){
      this.communication.publish('silosSago/XQDD7E/input/pantalla',this.displayStr);
  }

}
