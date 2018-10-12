import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

//Calendar dependencies installed, and ios emulator installed 
//Calender updated from master to reflect the branch merge of installing IOS emulator environment

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private platform: Platform) {
    this.platform.ready().then(() => {
      this.calendar.listCalendars().then(data => { 
        this.calendar = data;
      });
    })
  }

    //Page Load
    ionViewDidLoad() {
      console.log('ionViewDidLoad CalendarPage');
    }

  //Calendar
  addEvent(calendar) {

    // if (this.platform.is('cordova')) {
      
    // } else {
      
    // }

    let date = new Date();
    let options = { calendarID: calendar.id, calendarName: calendar.name, url: 'https://ionicacademy.com', firstReminderMinutes: 15};

    this.calendar.createEventInteractivelyWithOptions('My new Event', 'Deez', 'Notes', date, date, options).then(res => {
    }, err => {
      console.log('err: ', err);
    });
  }

  openCalendar(calendar) {
    this.navCtrl.push('CalDetailsPage', { name: calendar.name })
  }

}
