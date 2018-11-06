import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Calendar dependencies installed, and ios emulator installed 
//Calender updated from master to reflect the branch merge of installing IOS emulator environment

//Import Pages
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';
import { getLocaleDateTimeFormat, getLocaleDateFormat } from '@angular/common';

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
    //Apparently if we want to pass an array to an element in HTML it has to be defined at the class level as a part of the constructor
    // https://stackoverflow.com/questions/45792074/ngfor-array-to-ion-list-in-ionic-2
    this.currentEvents = [{
      year: 2018, month: 9, date: 26
    },
    {
      year: 2018, month: 9, date: 22
    }];
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
    this.databaseFilter.next(this.selectedDay);
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);
  }


  ionViewDidLoad() {
    //Set the value of class variable "this.date" to a new date() , which is the current date
    this.date = new Date();

    //On load set the value of the "databaseFilter" to the current date by default
    //^^^ Formatted to the way firebase is storing the date
    this.databaseFilter.next(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate());

    //Call the calendar service to load the events of the current day by default
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilter);

    // //Values to get the timezone offset if necessary
    // var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    // var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    //Reset the "databaseFilter" to a value which will allow all values to be pulled from the database
    this.databaseFilter.next("")
    //Reset the "events" BehaviorSubject (behaves like an array) to the  values of all events
    //this.events = this.CalendarEventSvc.getEvents(this.databaseFilter)

    //Populate the different members in the array dynamically
    //This can be bound to the .html decorator 
    // this.currentEvents = [
    //   {
    //     year: 2018,
    //     month: 10,
    //     date: 25
    //   },
    //   {
    //     year: 2018,
    //     month: 10,
    //     date: 28
    //   }
    // ];


    //I don't fucking understand the error I'm getting... the documentatino in the link below says to do it this way
    //https://www.npmjs.com/package/ionic3-calendar-en?activeTab=readme

    //This is an apparent solution, but I have work in 30 mins and my brain is shot to hell
    //https://github.com/angular-ui/ui-select/issues/519

    //Uncaught(in promise): TypeError: Cannot read property 'length' of undefined TypeError: Cannot read property 'length' of undefined at Calendar.isInEvents
  }

  //Get the selected day 
  onDaySelect($event) {
    //Properties of $event below::
    // console.log($event);
    // console.log($event.year);
    // console.log($event.month);
    // console.log($event.date);

    //Format the date gathered from the event into a string that can be compared to firebase 
    //console.log($event.year + "-" + ($event.month + 1) + "-" + $event.date);
    //Store that formatted string into the "selectedDay" class variable 
    this.selectedDay = ($event.year + "-" + ($event.month + 1) + "-" + $event.date);
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

