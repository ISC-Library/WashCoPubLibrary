import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobLinksPage } from './joblinks';

@NgModule({
  declarations: [
    JobLinksPage,
  ],
  imports: [
    IonicPageModule.forChild(JobLinksPage),
  ],
})
export class JobLinksPageModule {}
