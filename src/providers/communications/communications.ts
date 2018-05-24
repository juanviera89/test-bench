import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

declare var cordova: any;

/*
  Generated class for the CommunicationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommunicationsProvider {

  public authCode ="";

  constructor(public http: Http,public events: Events) {
    console.log('Hello CommunicationsProvider Provider');

    

  
  }

  

  connectMQTT(url,port,user,pswd){
    return new Promise ((Resolve,reject) => {
      cordova.plugins.CordovaMqTTPlugin.connect({
        url: url, //a public broker used for testing purposes only. Try using a self hosted broker for production.
        port: port,
        connectionTimeout: 3000,
        willTopicConfig: {
            qos: 2, //default is 0
            retain: false, //default is true
            topic: "SimuladorDeRiego",
            payload: "Conexión desde App de Simulador de Riego Interactivo"
        },
        username: user,
        password: pswd,
        keepAlive: 120,
        success: function (s) {
            console.log("connect success");
            Resolve (true);
            //this.publish('SimuladorDeRiego/conexion','me he conectado');
        },
        error: function (e) {
          console.log("connect error");
          reject(e);
        },
        onConnectionLost: function () {
          console.log("disconnect");
        },
    });
  })
  }


 publish(topic,msg){
  return new Promise ((Resolve,reject) => {

    this.verifyCode().then( res =>{

      if(res['auth'] == true) {
        console.log('usuario autenticado. Se le permite postear instruccion');
        cordova.plugins.CordovaMqTTPlugin.publish({
          topic: topic,
          payload: msg,
          qos: 2,
          retain: false,
          success: function (s) {
            console.log("publicado en " + topic);
            console.log(s);
            Resolve(true);
  
          },
          error: function (e) {
            console.log("error al publicar");
            reject(e);
  
          }
      });
      } else {
        console.log('error: usuario no autenticado. No se le permite postear instruccion');
        reject('error: usuario no autenticado. No se le permite postear instruccion');
      }

    }).catch(err => {
      console.log(err);
      reject(err);
    })
   
  })
}

verifyCode(){

    return new Promise ((Resolve,reject) => {
      this.http.post("http://192.168.100.14:2411/simulador/code/" , {"code": this.authCode} )
      .map(res => res.json())
      .subscribe(
        data => { 
          console.log(data);
          Resolve(data);
          //resolve(data['planificacion']);
        },
        error => {
          console.log(error);
          reject(error);
        }
      )

    });
  
}

subscribe(topic,funct,_var){
  return new Promise ((resolve,reject)=>{
    cordova.plugins.CordovaMqTTPlugin.subscribe({
      topic:topic,
      qos:2,
     success:function(s){
      console.log("subscrito a " + topic);
      console.log(s);
      cordova.plugins.CordovaMqTTPlugin.listen(topic,(payload,params) => {
        _var = funct(payload,params);
      })
      resolve(true);
     },
     error:function(e){
      console.log("error al subscribir");
      reject(e);
    
     }
   });
  })
}

subscribeListening(topic,eventName){
  let fire = this.fireEvent;
  let _events = this.events;
  return new Promise ((resolve,reject)=>{
    cordova.plugins.CordovaMqTTPlugin.subscribe({
      topic:topic,
      qos:2,
     success:function(s){
      console.log("subscrito a " + topic);
      console.log(s);
      cordova.plugins.CordovaMqTTPlugin.listen(topic,(payload,params) => {
        console.log('llego msg: ' + payload + ' a topico ' + topic);
               fire(eventName,payload,true,_events);
      })
      resolve(true);
     },
     error:function(e){
      console.log("error al subscribir");
      reject(e);
    
     }
   });
  })
}

fireEvent(eventName,data,_date : boolean,eventHandler){
  let __date = new Date;
  let _sec = __date.getSeconds()+'';
  _sec = _sec.length == 1 ? '0'+_sec :  _sec;
  let _min = __date.getMinutes()+'';
  _min = _min.length == 1 ? '0'+_min :  _min;
  let _hour = __date.getHours()+'';
  _hour = _hour.length == 1 ? '0'+_hour :  _hour;
  let _time = _hour+_min+_sec;

  console.log('event ' + eventName + ' data : ' + data + 'at ' + _time);
  eventHandler.publish(eventName, data, _date ? _time : null);
}




}
