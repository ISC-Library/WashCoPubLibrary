import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalGovernmentAndServicesPage } from './local-government-and-services';

@NgModule({
  declarations: [
    LocalGovernmentAndServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalGovernmentAndServicesPage),
  ],
})
export class LocalGovernmentAndServicesPageModule {}
