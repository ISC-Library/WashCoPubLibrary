import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommissionPage } from './commission';

@NgModule({
  declarations: [
    CommissionPage,
  ],
  imports: [
    IonicPageModule.forChild(CommissionPage),
  ],
})
export class CommissionPageModule {}
