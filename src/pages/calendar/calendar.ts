import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Import Pages
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';
import { getLocaleDateTimeFormat, getLocaleDateFormat } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  //Declare Date variables 
  date: any;
  currentDay: any;
  selectedDay: any;

  //Declare event variables 
  eventList: any;
  selectedEvent: any;
  isSelected: any;

  //Class variable to hold the values gathered from the service 
  events: Observable<any[]>;

  //Declare list (array) to hold dateparts, used to pass event dates to calendar for CSS purposes (THE DOTS!)
  currentEvents: any;

  //Declare the database filter variable 
  databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');
  year: any;
  month: any;
  day: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    public CalendarEventSvc: CalenderEventsServiceProvider) {
    
    //This.currentEvents needs to be converted to any array in the constructor 
    this.currentEvents = [];
  }



  // Function to navigate to the "HomePage" using the NavController 
  navigateToHomePage() {
    this.navCtrl.push(HomePage);
  }


  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Below this are the portions to display event data  [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]


  //Call the calendar service 
  callCalendarEventsProvider() {
    //this.databaseFilter.next(this.selectedDay);
    console.log("cal events svc ()");
    //this.databaseFilter.next("0");
    console.log(this.databaseFilter);
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);
  }


  ionViewDidLoad() {
  //   this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);
  //   this.events.subscribe(data => this.currentEvents = data);
    
  //   //Set the value of class variable "this.date" to a new date() , which is the current date
  //   this.date = new Date();
 
  //   //On load set the value of the "databaseFilter" to the current date by default
  //   //^^^ Formatted to the way firebase is storing the date

  //   //For full explanation of if structure: See "onDaySelect()" subproceedure
  //   let appendedDate: string;
  //   let appendedMonth: string;

  //   //Both
  //   if ((String(this.date.getMonth() + 1).length < 2 ) && (String(this.date.getDate()).length < 2 )){
  //     //Save each change as an "appeneded" version
  //     appendedMonth = ("0" + (this.date.getMonth() + 1));
  //     appendedDate = ("0" + this.date.getDate());
  //     //Format the date gathered from the event into a string that can be compared to firebase 
  //     //Set the "dataBaseFilter" according to the newly values, in the specified format
  //     this.databaseFilter.next(this.date.getFullYear() + "-" + appendedMonth + "-" + appendedDate);
  //   } else if(String(this.date.getMonth() + 1).length < 2 ){
  //     //Month
  //     //For some reason we have to add a 1, because the months are always behind
  //     appendedMonth = ("0" + (this.date.getMonth() + 1));
  //     this.databaseFilter.next(this.date.getFullYear() + "-" + appendedMonth + "-" + this.date.getDate());
  //   } else if (String(this.date.getDate()).length < 2 ){
  //     //Day ... "date"
  //     appendedDate = ("0" + this.date.getDate());
  //     this.databaseFilter.next(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + appendedDate);
  //   } else {
  //     //If both the day and the month had double digit values
  //       //Do not modify the values 
  //     this.databaseFilter.next(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate());
  //   }

  //   this.CalendarEventSvc.getEvents(this.databaseFilter);
  //   // console.log("database filter");
  //   // console.log(this.databaseFilter);

  //   //Call the calendar service to load the events of the current day by default
  //   //this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);
  //   // this.events.subscribe(data => this.currentEvents = data);
    
  //   // console.log("current Events 1");
  //   // console.log(this.currentEvents);
    
  //   // //Values to get the timezone offset if necessary
  //   // var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  //   // var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

  //   //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  //   //Reset the "databaseFilter" to a value which will allow all values to be pulled from the database
  //   //this.databaseFilter.next("")
  //   //Reset the "events" BehaviorSubject (behaves like an array) to the  values of all events
  //   //this.events = this.CalendarEventSvc.getEvents(this.databaseFilter)

  //   //Populate the different members in the array dynamically
  //   //This can be bound to the .html decorator 
    
    

  //   // this.currentEvents = [
  //   //   {
  //   //     year: 2018,
  //   //     month: 9,
  //   //     date: 1
  //   //   },
  //   //   {
  //   //     year: 2018,
  //   //     month: 9,
  //   //     date: 23
  //   //   }
  //   // ];

 }


  //Get the selected day 
  onDaySelect($event) {
    //************************************************** 
    //For testing: 
    // Properties of $event below::
    // console.log($event);
    // console.log("event data")
    // console.log($event.year);
    // console.log($event.month);
    // console.log($event.date);
    //************************************************** 
    

    //Firebase has dates stored with leading zeros for months and days 
    //This causes the database provider not to be able to filter correctly unless a leading 0 is added to days with a single digit
    
    //Process::
    //The ($event) is not passed as a string so we must convert it before we take its "length" property
      //Then measure the length, if it is 1 this  means we are dealing with a single digit number
      //If so, append "0" to the beginning of the single digit portion
    let appendedEventDate: string;
    let appendedEventMonth: string;

      //Both
    if ((String($event.month + 1).length < 2 ) && (String($event.date).length < 2 )){
      //Save each change as an "appeneded" version
      appendedEventMonth = ("0" + ($event.month + 1));
      appendedEventDate = ("0" + $event.date);
      //Format the date gathered from the event into a string that can be compared to firebase 
      //Set the "selectedDay" according to the newly values, in the specified format
      this.selectedDay = ($event.year + "-" + appendedEventMonth + "-" + appendedEventDate);
    } else if(String($event.month + 1).length < 2 ){
      //Month
      //For some reason we have to add a 1, because the months are always behind
      appendedEventMonth = ("0" + ($event.month + 1));
      this.selectedDay = ($event.year + "-" + appendedEventMonth + "-" + $event.date);
    } else if (String($event.date).length < 2 ){
      //Day ... "date"
      appendedEventDate = ("0" + $event.date);
      this.selectedDay = ($event.year + "-" + ($event.month + 1) + "-" + appendedEventDate);
    } else {
      //If both the day and the month had double digit values
        //Do not modify the values 
      this.selectedDay = ($event.year + "-" + ($event.month + 1) + "-" + $event.date);
    }

    //Set the database filter to the "selectedDay"
    this.databaseFilter.next(this.selectedDay);
  
    //Call the database filtered by the selected day
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);
    
  }

  keydownValue: string;

  fuckingShit(){
    this.databaseFilter.next(this.keydownValue)
    
    
    console.log(this.databaseFilter);
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);
  }



  //Check Events on a selected day 
  checkEventDay(day) {
    var hasEvent = false;
    var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
    var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
    this.eventList.forEach(event => {
      if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        hasEvent = true;
      }
    });
    return hasEvent;
  }






  //Load events for the current months 
  loadEventThisMonth() {
    this.eventList = new Array();
    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
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






  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Everything below this is interaction with the native events on the phone [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]

  //Open Native Calendar 
  openCalendar() {
    this.calendar.openCalendar(new Date()).then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    )
  }

  //Add an event to your native calendar 
  addNativeEvent() {
    return this.calendar.createEventInteractively("event title");
  }

  //Native event scheduler 
  scheduleEvents() {
    this.calendar.hasReadWritePermission().then((result) => {
      if (result === false) {
        this.calendar.requestReadWritePermission().then((v) => {
          this.addNativeEvent();
        }, (r) => {
          console.log("Rejected");
        })
      }
      else {
        this.addNativeEvent();
      }
    })

  }
  addEvent() {
    this.navCtrl.push(AddEventPage);
  }
}

