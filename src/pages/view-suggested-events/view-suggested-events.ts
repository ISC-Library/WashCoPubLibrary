import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
    public SuggestedEventSvc: SuggestedEventsServiceProvider ) {

    this.events = this.SuggestedEventSvc.addEvents(this.databaseFilter)
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSuggestedEventsPage');

    
  };

  // share(slidingItem: ItemSliding) {
  //   slidingItem.close();
  // }

  ondrag(item) {
    let percent = item.getSlidingPercent();
    if (percent > 0) {
      // positive
      console.log('right side');
    } else {
      // negative
      console.log('left side');
    }
    if (Math.abs(percent) > 1) {
      console.log('overscroll');
    }
  }

  addEvent(item) {
    console.log("add Event");
  };


  addEventWithModification(item) {
    console.log("add with modification");
  };


  deleteSuggestedEvent(item) {
    console.log("delete");
  };

}
