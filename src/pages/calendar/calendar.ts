import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

//Calendar dependencies installed, and ios emulator installed 
//Calender updated from master to reflect the branch merge of installing IOS emulator environment

//Import Pages
import { HomePage } from '../home/home';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar) {

  }

    //Page Load
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad CalendarPage');
    //   console.log('test value');
    // }

    //Function to navigate to the "HomePage" using the NavController 
  //  navigateToHomePage(){
  //   this.navCtrl.push(HomePage);
  // }
  
  openCalendar(){
    this.calendar.openCalendar(new Date()).then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    )
  }

  addEvent(){
    return this.calendar.createEventInteractively("event title");
}


scheduleEvents(){
    this.calendar.hasReadWritePermission().then((result)=>{
    if(result === false){
        this.calendar.requestReadWritePermission().then((v)=>{
            this.addEvent();
        },(r)=>{
            console.log("Rejected");
        })
    }
    else
    {
        this.addEvent();
    }
    })

}
}

