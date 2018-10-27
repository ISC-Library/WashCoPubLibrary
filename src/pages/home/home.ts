import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';

//Import any other pages you need to reference
 import { TestPage } from '../test/test';
 import { AboutPage } from '../about/about';

 
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
    this.navCtrl.push(CalendarPage);
  }

  goToHelp() {
    this.navCtrl.push(AboutPage);
  }

  goToBookShelf(){
    window.open("https://abdodigital.com/?tk=A8A412886D6FFCA174EA2F2E90A6169D", '_system', 'location=yes');
  }
}
