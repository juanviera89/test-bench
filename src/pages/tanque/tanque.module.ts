import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TanquePage } from './tanque';

@NgModule({
  declarations: [
    TanquePage,
  ],
  imports: [
    IonicPageModule.forChild(TanquePage),
  ],
})
export class TanquePageModule {}
