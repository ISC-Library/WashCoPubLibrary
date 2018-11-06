import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams} from 'ionic-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemSliding } from 'ionic-angular';

//Import Pages

//Import Provider
import { SuggestedEventsServiceProvider } from '../../providers/add-suggested-events/add-suggested-events'


@Component({
  selector: 'page-view-suggested-events',
  templateUrl: 'view-suggested-events.html',
})
export class ViewSuggestedEventsPage {

  //Class variable to hold the values gathered from the service 
events: Observable<any[]>;
databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');


constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public SuggestedEventSvc: SuggestedEventsServiceProvider,
    public loadingCtrl: LoadingController ) {

    this.events = this.SuggestedEventSvc.addEvents(this.databaseFilter)
}

$

  ionViewDidLoad() {
    //Show a loading spinner to ensure the data is loaded rather than just coming into a blank page 
    this.presentLoadingDefault()
  };

  //Loading Spinner
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Suggested Events are loading...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  };

  //Custom Spinner code for when we decide to tailor make one.
  // presentLoadingCustom() {
  //   let loading = this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: `
  //       <div class="custom-spinner-container">
  //         <div class="custom-spinner-box"></div>
  //       </div>`,
  //     duration: 5000
  //   });
  
  //   loading.onDidDismiss(() => {
  //     console.log('Dismissed loading');
  //   });
  
  //   loading.present();
  // };


  addSuggestedEvent(item) {
    console.log("Add");
  };


  modifySuggestedEvent(item) {
    console.log("Modify");
  };


  deleteSuggestedEvent(item) {
    console.log("Delete");
  };
  

};
