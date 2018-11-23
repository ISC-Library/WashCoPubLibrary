import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, Platform, Loading } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getLocaleDateTimeFormat, getLocaleDateFormat } from '@angular/common';

//Import Pages
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';
import { ModifyEventsPage } from '../modify-events/modify-events'

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  //Declare Date variables 
  date: any;
  selectedDay: any;

  //Class variable to hold the values gathered from the service 
  events: Observable<any[]>;

  //Declare formatted dates (array)
    //holds formatted dates {year, month, date} abstracted from the "startDate" of the "allEvents" (array)
  formattedForCSS: any;

  //Declare the database filter variable
    //Dynamic: Can change so that dynamic filters can be passed to the database 
  databaseFilterDynamic: BehaviorSubject<string | null> = new BehaviorSubject('');
    //Static: Stays as default ('') so that the 
      //Used for the "eventsForCSS" Observable so that it will hold all events (unfiltered), which is default
  databaseFilterStatic: BehaviorSubject<string | null> = new BehaviorSubject('');
 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    public CalendarEventSvc: CalenderEventsServiceProvider,
    public loadingCtrl:LoadingController) {
    
    //This.formattedForCSS needs to be converted to any array 
    this.formattedForCSS = [];

    //Set the value of the class variable "event" to the event passed 
    this.formattedForCSS = this.navParams.get('formattedForCSS');


    //Set the "events" Observable equal to a call to the database unfiltered by default (all events)
      //Use the "databaseFilterDynamic" to allow it to retrieve data dynamically
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilterDynamic);
  }


  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Below are navigation functions  [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]


  // Navigate to the "HomePage" using the NavController 
  navigateToHomePage() {
    this.navCtrl.push(HomePage);
  }

  // Navigate to the "ModifyEvent" page
    //The user selects modify button on the event which they wish to modify 
      //The event data for that specific event is passed, which we will forward to the "ModifyEvent" page
  modifyEvent(event) {
    this.navCtrl.push(ModifyEventsPage, {
      event
    });
  }

  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Below this are the portions to display event data  [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]


  ionViewDidLoad() {

    //Show a loading spinner to ensure the data is loaded rather than just coming into a blank page 
    //Dots still
    this.presentLoadingDefault()
  };

  //Loading Spinner
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Calendar is loading...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

    // Set the value of class variable "this.date" to a new date() , which is the current date
    this.date = new Date();
 
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



  //Get the selected day 
  onDaySelect($event) {
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

    console.log(this.events)
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

