import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesoPage } from './peso';

@NgModule({
  declarations: [
    PesoPage,
  ],
  imports: [
    IonicPageModule.forChild(PesoPage),
  ],
})
export class PesoPageModule {}
