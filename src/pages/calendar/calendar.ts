import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Calendar dependencies installed, and ios emulator installed 
//Calender updated from master to reflect the branch merge of installing IOS emulator environment

//Import Pages
import { HomePage } from '../home/home';
import { AddEventPage} from '../add-event/add-event';

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

//Declare date variables 
date: any;
daysInThisMonth: any;
daysInLastMonth: any;
daysInNextMonth: any;
monthNames: string[];
currentMonth: any;
currentYear: any;
currentDate: any;
selectedDay: any;

//Declare event variables 
eventList: any;
selectedEvent: any;
isSelected: any;

//Class variable to hold the values gathered from the service 
events: Observable<any[]>;

//Declare the database filter variable 
databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private calendar: Calendar,
              public CalendarEventSvc: CalenderEventsServiceProvider) {
  }


 // Function to navigate to the "HomePage" using the NavController 
   navigateToHomePage(){
    this.navCtrl.push(HomePage);
  }
  
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Below this are the portions to display event data  [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]

  //Call the calendar service 
  //Function to interact with the "TestProvider" via button
  callCalendarEventsProvider(){
    // console.log("selected day");
    // console.log(this.selectedDay);
    this.databaseFilter.next(this.selectedDay);
    // console.log("filter")
    // console.log(this.databaseFilter);
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);
  }


  //Get the selected day
  onDaySelect($event) {
    // console.log($event);
    // console.log($event.year);
    // console.log($event.month);
    // console.log($event.date);

    //this.selectedDay=$event.date;
    this.selectedDay="2017";
    //this.databaseFilter=this.selectedDay;
    
     //console.log(this.databaseFilter);
  }



  //Load events for the current months 
  loadEventThisMonth() {
    this.eventList = new Array();
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
          this.eventList.push(item);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Check Events on a selected day 
  checkEventDay(day) {
    var hasEvent = false;
    var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
    this.eventList.forEach(event => {
      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        hasEvent = true;
      }
    });
    return hasEvent;
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

