import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

//Calendar dependencies installed, and ios emulator installed 
//Calender updated from master to reflect the branch merge of installing IOS emulator environment

//Import Pages
import { HomePage } from '../home/home';
import { AddEventPage} from '../add-event/add-event';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar) {

  }


 // Function to navigate to the "HomePage" using the NavController 
   navigateToHomePage(){
    this.navCtrl.push(HomePage);
  }
  





  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Everything below this is interaction with the native events on the phone [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]

  //Open Native Calendar 
  openCalendar(){
    this.calendar.openCalendar(new Date()).then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    )
  }

  //Add an event to your native calendar 
  addNativeEvent(){
    return this.calendar.createEventInteractively("event title");
}

//Native event scheduler 
scheduleEvents(){
    this.calendar.hasReadWritePermission().then((result)=>{
    if(result === false){
        this.calendar.requestReadWritePermission().then((v)=>{
            this.addNativeEvent();
        },(r)=>{
            console.log("Rejected");
        })
    }
    else
    {
        this.addNativeEvent();
    }
    })

}
addEvent() {
    this.navCtrl.push(AddEventPage);
  }
}

