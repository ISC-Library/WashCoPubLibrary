import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  goToCalendar() {
    this.navCtrl.setRoot(CalendarPage);
  }
}
