import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolDistrictsPage } from './school-districts';

@NgModule({
  declarations: [
    SchoolDistrictsPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolDistrictsPage),
  ],
})
export class SchoolDistrictsPageModule {}
