import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatomPage } from './chatom';

@NgModule({
  declarations: [
    ChatomPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatomPage),
  ],
})
export class ChatomPageModule {}
