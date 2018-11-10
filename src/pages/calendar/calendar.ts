import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getLocaleDateTimeFormat, getLocaleDateFormat } from '@angular/common';

//Import Pages
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';


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

  item: any;

  //Class variable to hold the values gathered from the service 
  events: Observable<any[]>;
  //Class variable to hold the values gathered from th service
    //There must be a variable that holds all of the events, (non-filtered)
      //This is so that we can populate the CSS for any day with an event
        //The other "events" Observable changes according to current Date, or user's selecting a day, etc.
  eventsForCSS: Observable<any[]>;

  //Declare list (array) to hold all events, used to pass event dates to calendar for CSS purposes (THE DOTS!)
  allEvents: any;
  //Declare formatted dates (array)
    //holds formatted dates {year, month, date} abstracted from the "startDate" of the "allEvents" (array)
  formattedForCSS: any;
  testArray: any;

  //Declare the database filter variable
    //Dynamic: Can change so that dynamic filters can be passed to the database 
  databaseFilterDynamic: BehaviorSubject<string | null> = new BehaviorSubject('');
    //Static: Stays as default ('') so that the 
      //Used for the "eventsForCSS" Observable so that it will hold all events (unfiltered), which is default
  databaseFilterStatic: BehaviorSubject<string | null> = new BehaviorSubject('');
  year: any;
  month: any;
  day: any;
  testString: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    public CalendarEventSvc: CalenderEventsServiceProvider) {
    
    //This.allEvents needs to be converted to any array 
    this.allEvents = [];
    //This.formattedForCSS needs to be converted to any array 
    this.formattedForCSS = [];
    this.testArray = [];

    //Set the "eventsForCSS" Observable equal to a call to the database unfiltered (all events)
      //Use the "databaseFilterStatic" to allow it to retrieve the default / unfiltered set (all events)
    this.eventsForCSS = this.CalendarEventSvc.getEvents(this.databaseFilterStatic);
    
    //Set the "events" Observable equal to a call to the database unfiltered by default (all events)
      //Use the "databaseFilterDynamic" to allow it to retrieve data dynamically
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilterDynamic);

    //We must .subscribe to the "eventsForCSS" Observable before attempting to do anything with its values
      //This is because the code is being run asynchronously... meaning the line of code may not complete directly after it is called
        //.Subscribe will let us know when the code is finished executing, by not allowing its inner portion to execute until then
          //This allows us to only attempt to access "eventsForCSS" data once it has "promised" us that the data is now there  
    this.eventsForCSS.subscribe((data) => {
      //Set the .subscription "data" values that are returned to the array "allEvents[]"
      this.allEvents = data;
      //console.log(this.allEvents)
      //Once we know that "allEvents[]" has data, reformat the values 
      this.reformatAllEventsArray();
    });

    
  }


  // Function to navigate to the "HomePage" using the NavController 
  navigateToHomePage() {
    this.navCtrl.push(HomePage);
  }


  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Below this are the portions to display event data  [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]

  displayItem() {
    console.log(this.item)
  };


  ionViewDidLoad() {
    // Set the value of class variable "this.date" to a new date() , which is the current date
    this.date = new Date();
 
    //On load set the value of the "databaseFilterDynamic" to the current date by default
    //^^^ Formatted to the way firebase is storing the date

    //For full explanation of if structure: See "onDaySelect()" subproceedure
    let appendedDate: string;
    let appendedMonth: string;

    //Both
    if ((String(this.date.getMonth() + 1).length < 2 ) && (String(this.date.getDate()).length < 2 )){
      //Save each change as an "appeneded" version
      appendedMonth = ("0" + (this.date.getMonth() + 1));
      appendedDate = ("0" + this.date.getDate());
      //Format the date gathered from the event into a string that can be compared to firebase 
      //Set the "dataBaseFilter" according to the newly values, in the specified format
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + appendedMonth + "-" + appendedDate);
    } else if(String(this.date.getMonth() + 1).length < 2 ){
      //Month
      //For some reason we have to add a 1, because the months are always behind
      appendedMonth = ("0" + (this.date.getMonth() + 1));
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + appendedMonth + "-" + this.date.getDate());
    } else if (String(this.date.getDate()).length < 2 ){
      //Day ... "date"
      appendedDate = ("0" + this.date.getDate());
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + appendedDate);
    } else {
      //If both the day and the month had double digit values
        //Do not modify the values 
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate());
    }

    this.CalendarEventSvc.getEvents(this.databaseFilterDynamic);
    
    
    //Values to get the timezone offset if necessary
    //var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    //var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


 };
 
  

  reformatAllEventsArray(){
    //For Loop Syntax:
      //Let "iteration variable" = initialized value;
      //While "condition";
      //Increment "iteration variable"
    for (let i = 0; i < this.allEvents.length; i++) {
      //console.log(this.allEvents)
      //console.log(this.allEvents[i].startDate);
      //console.log(this.allEvents[i].startDate.split("-"))
      

      //The "string.split" function creates an array for each value split via the delimiter
        //We will store those values in a temporary array
      let tempArray = this.allEvents[i].startDate.split("-");
      //TempArray: [0] = year, [1] = month, [2] = date
        //Set each property of the object respective to the portion of the "tempArray" it should hold

      //The month is always  -1 from what it should be, so add the value back to it 
      let appendedMonth = parseInt(tempArray[1]);
      appendedMonth = (appendedMonth -1)

      
      this.formattedForCSS[i] = {
        year:parseInt(tempArray[0]), 
        month:appendedMonth, 
        date:parseInt(tempArray[2])
      };
     
      //Use the ".push" method of array data types on the "formattedForCSS" array...
        //To push the formatted "dateObject" into the array, at the current index of
      // this.formattedForCSS.push({dateObject})
      // console.log(this.formattedForCSS);
    } 

    //return this.formattedForCSS;
    
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
    this.databaseFilterDynamic.next(this.selectedDay);
  
    //Call the database filtered by the selected day
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilterDynamic);
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

