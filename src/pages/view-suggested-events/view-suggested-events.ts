import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Import Pages

//Import Provider
import { SuggestedEventsServiceProvider } from '../../providers/add-suggested-events/add-suggested-events'
//import { ViewSuggestedEventsServiceProvider } from '../view-suggested-events/view-suggested-events';


@Component({
  selector: 'page-view-suggested-events',
  templateUrl: 'view-suggested-events.html',
})
export class ViewSuggestedEventsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public SuggestedEventSvc: SuggestedEventsServiceProvider ) {
}


//Class variable to hold the values gathered from the service 
events: Observable<any[]>;
databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');













  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSuggestedEventsPage');

    this.events = this.SuggestedEventSvc.addEvents(this.databaseFilter)

  }

}
