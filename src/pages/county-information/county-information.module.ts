import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountyInformationPage } from './county-information';

@NgModule({
  declarations: [
    CountyInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(CountyInformationPage),
  ],
})
export class CountyInformationPageModule {}
