import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';

@Component({
  selector: 'page-joblinks',
  templateUrl: 'joblinks.html',
})
export class JobLinksPage {
// jobType:"";
keyword:"";
selectedLocation:"";
selectedSearchRadius:"";
selectedJobType:"";
jobType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }


  jobSearch($location, $keyword, $jobType, $radius){

    if($jobType=="partTime"){
      this.jobType="2"
    }

    else if($jobType=="fullTime"){
      this.jobType="1"
    }

    else if($jobType=="allJobs"){
      this.jobType="0"
    }

    let jobSearchLink = "https://jobs.al.com/Jobs/" + $keyword + "-jobs-in-" + $location + "?" + "countryId=3" + "&startindex=0&engagementtype=" + this.jobType + "&radius=" + $radius;
    window.open(jobSearchLink, '_system', 'location=yes');
  }
}
