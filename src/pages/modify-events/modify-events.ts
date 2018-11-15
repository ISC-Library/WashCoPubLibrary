import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'page-modify-events',
  templateUrl: 'modify-events.html',
})

export class ModifyEventsPage {

  //Class variable to hold the values gathered from the service 
  events: Observable<any[]>;

  //Variable to hold the "event" passed from the "calendar" page
    //The "event" is an object that is used to format the data being pushed into the database 
  event = { 
    title: "", 
    location: "", 
    notes: "", 
    startDate: "",
    endDate: "", 
    startTime: "", 
    endTime: "" 
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get('event');
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyEventsPage');
    console.log(this.event)
  }

}
