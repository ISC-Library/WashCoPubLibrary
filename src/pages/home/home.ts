import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';

//Import any other pages you need to reference
import { TestPage } from '../test/test';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  //Function to navigate to the "TestPage" using the NavController 
  navigateToTestPage(){
    this.navCtrl.push(TestPage);
  }
  
  goToCalendar() {
    this.navCtrl.setRoot(CalendarPage);
  }
}
