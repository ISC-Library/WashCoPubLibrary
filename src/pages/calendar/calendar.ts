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
import { AddSuggestedEventsPage } from '../add-suggested-events/add-suggested-events'
import { ViewSuggestedEventsPage } from '../view-suggested-events/view-suggested-events'

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';
import { AdminAuthProvider } from '../../providers/admin-auth/admin-auth';

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
    public loadingCtrl:LoadingController,
    public AdminAuthProvider: AdminAuthProvider) {
    
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

  //Function to navigate to the "SuggestEventsPage"
  navigateToAddEventsPage(){
    this.navCtrl.push(AddEventPage);
  }

  //Function to navigate to the "SuggestEventsPage"
  navigateToAddSuggestEventsPage(){
    this.navCtrl.push(AddSuggestedEventsPage);
  }

   //Function to navigate to the "SuggestEventsPage"
  navigateToViewSuggestEventsPage(){
    this.navCtrl.push(ViewSuggestedEventsPage);
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
    //this.presentLoadingDefault()
  };

  ionViewWillEnter() {
    this.isAdmin()
  }

  ionViewDidEnter () {
    this.presentLoadingDefault()
  }

  isAdmin () {
    // if (this.AdminAuthProvider.isLoggedIn()) {
      
    // } 
    //console.log(this.AdminAuthProvider.currentUser.name)
    if (this.AdminAuthProvider.isAdmin()) {
      console.log("true")
      return true;
    } else {
      console.log("false")
      return false;
    }
  }

  //Loading Spinner
    //The portion to load the events for today's date are in here...
        //This prevents them from attempting to load before the event spinner is invoked
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

    //console.log(this.events)
  }


  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Everything below changes the event blips displayed (based on categories) [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]


  changeCategoriesDisplayed($event) {
  console.log(event)
    //Get lists of all the elements by classname (their category)
    let elementsListMultiple= document.getElementsByClassName("eventBlip");
    let elementsListSporting= document.getElementsByClassName("sportingBlip");
    let elementsListCommunity= document.getElementsByClassName("communityBlip");
    let elementsListBusiness= document.getElementsByClassName("businessBlip");
    let elementsListArt= document.getElementsByClassName("artBlip");

    
    //Get the length of each set of elements (by classname) 
      //We will use these to determine the length of the loop corresponding to hiding each collection respectively
      let multipleLength = elementsListMultiple.length
      let sportingLength = elementsListSporting.length
      let communityLength = elementsListCommunity.length
      let businessLength = elementsListBusiness.length
      let artLength = elementsListArt.length
      

    //Show All
    if ($event.value == "all") {
      //Get lists of all the Hidden elements by classname (their category)
      let elementsListMultipleHidden= document.getElementsByClassName("eventBlipHidden");
      let elementsListSportingHidden= document.getElementsByClassName("sportingBlipHidden");
      let elementsListCommunityHidden= document.getElementsByClassName("communityBlipHidden");
      let elementsListBusinessHidden= document.getElementsByClassName("businessBlipHidden");
      let elementsListArtHidden= document.getElementsByClassName("artBlipHidden");
    
      //Get the length of each set of elements (by classname) 
      //We will use these to determine the length of the loop corresponding to hiding each collection respectively
      let multipleLengthHidden = elementsListMultipleHidden.length
      let sportingLengthHidden = elementsListSportingHidden.length
      let communityLengthHidden = elementsListCommunityHidden.length
      let businessLengthHidden = elementsListBusinessHidden.length
      let artLengthHidden = elementsListArtHidden.length
      
      //Show Multiple
      for (let i = (multipleLengthHidden -1); i > -1; i--) {
        elementsListMultipleHidden[i].className = "eventBlip";
      }

      //Show Sporting
      for (let i = (sportingLengthHidden -1); i > -1; i--) {
        elementsListSportingHidden[i].className = "sportingBlip";
      }

      //Show Community
      for (let i = (communityLengthHidden -1); i > -1; i--) {
        elementsListCommunityHidden[i].className = "communityBlip";
      }

      //Show Business
      for (let i = (businessLengthHidden -1); i > -1; i--) {
        elementsListBusinessHidden[i].className = "businessBlip";
      }

      //Show Art
      for (let i = (artLengthHidden -1); i > -1; i--) {
        elementsListArtHidden[i].className = "artBlip";
      }
    }

    //Show Sporting
    if ($event.value == "sporting") {
      //If sporting is already hidden, we need to get a list of the hidden elements
      let elementsListSportingHidden = document.getElementsByClassName("sportingBlipHidden");
      //If the 'hidden collection' has length > 0 it is populated with elements
      if (elementsListSportingHidden.length > 0) {
        //Get the length of the hidden elements collection (sportingHidden)
        let sportingLengthHidden = elementsListSportingHidden.length

        //Show Sporting :: If not already shown
        for (let i = (sportingLengthHidden -1); i > -1; i--) {
          elementsListSportingHidden[i].className = "sportingBlip";
        }
      }
      
    //****** Explanation:: for loop logic 
      //First: the lengths are calculated dynamically, so each time we change the class of an element in the collection...
        //...the length of the collection is reduced by 1.
        //So if we attempt to iterate starting at 0 while "i" < length... it will never make it to the end of the array
        //This is because "i" increments by 1 while the length decrements by 1, so at some point 2 elements get skipped

    //Second: The "length" of any of the given HTML collections is a count, meaning it starts at 1 not 0
      //However the HTML collection indices start at 0, much like any other array type object
        //So we let the iterating variable "i" = the length of a given collection - 1, to account for these principles

    //Finally: We will actually decrement "i" starting with the original length of the HTML collection
      //This allows "i" to start at high end of the index and count down so nothing is missed
        //We know all arrays begin indexing at "0" so once "i" is at a point where only -1 is below it, we stop

      //Hide Multiple
      for (let i = (multipleLength -1); i > -1; i--) {
        //I could not surmise how to change the visibility of an HTML collection of classes
          //As the "visibility" property is for some reason not accessible even in a loop of elements[i]
            //The most effective way I saw to change the visiblity was to simply change the class of the elements
            //The class they are changed too has CSS which makes them "visbility =false"
        elementsListMultiple[i].className = "eventBlipHidden";
      }

      //Hide Community
      for (let i = (communityLength -1); i > -1; i--) {
        elementsListCommunity[i].className = "communityBlipHidden";
      }

      //Hide Business
      for (let i = (businessLength -1); i > -1; i--) {
        elementsListBusiness[i].className = "businessBlipHidden";
      }

      //Hide Art
      for (let i = (artLength -1); i > -1; i--) {
        elementsListArt[i].className = "artBlipHidden";
      }
    }

    //Show Community
    if ($event.value == "community") {
       let elementsListCommunityHidden= document.getElementsByClassName("communityBlipHidden");
       if (elementsListCommunityHidden.length > 0) {
         let communityLengthHidden = elementsListCommunityHidden.length
 
         //Show Community :: If not already shown
         for (let i = (communityLengthHidden -1); i > -1; i--) {
           elementsListCommunityHidden[i].className = "communityBlip";
         }
       }
      
        //Hide Multiple
        for (let i = (multipleLength -1); i > -1; i--) {
          elementsListMultiple[i].className = "eventBlipHidden";
        }
  
        //Hide Sporting
        for (let i = (sportingLength -1); i > -1; i--) {
          elementsListSporting[i].className = "sportingBlipHidden";
        }

        //Hide Business
        for (let i = (businessLength -1); i > -1; i--) {
          elementsListBusiness[i].className = "businessBlipHidden";
        }
  
        //Hide Art
        for (let i = (artLength -1); i > -1; i--) {
          elementsListArt[i].className = "artBlipHidden";
        }
      }

    //Show Business
    if ($event.value == "business") {
      let elementsListBusinessHidden= document.getElementsByClassName("businessBlipHidden");
      if (elementsListBusinessHidden.length > 0) {
        let businessLengthHidden = elementsListBusinessHidden.length

        //Show Business :: If not already shown
        for (let i = (businessLengthHidden -1); i > -1; i--) {
          elementsListBusinessHidden[i].className = "businessBlip";
        }
      }
     
       //Hide Multiple
       for (let i = (multipleLength -1); i > -1; i--) {
         elementsListMultiple[i].className = "eventBlipHidden";
       }
 
       //Hide Sporting
       for (let i = (sportingLength -1); i > -1; i--) {
         elementsListSporting[i].className = "sportingBlipHidden";
       }

       //Hide Community
       for (let i = (communityLength -1); i > -1; i--) {
         elementsListCommunity[i].className = "communityBlipHidden";
       }
 
       //Hide Art
       for (let i = (artLength -1); i > -1; i--) {
         elementsListArt[i].className = "artBlipHidden";
       }
     }

    //Show Art
    if ($event.value == "art") {
      let elementsListArtHidden= document.getElementsByClassName("artBlipHidden");
      if (elementsListArtHidden.length > 0) {
        let artLengthHidden = elementsListArtHidden.length

        //Show Art :: If not already shown
        for (let i = (artLengthHidden -1); i > -1; i--) {
          elementsListArtHidden[i].className = "artBlip";
        }
      }
     
       //Hide Multiple
       for (let i = (multipleLength -1); i > -1; i--) {
         elementsListMultiple[i].className = "eventBlipHidden";
       }
 
       //Hide Sporting
       for (let i = (sportingLength -1); i > -1; i--) {
         elementsListSporting[i].className = "sportingBlipHidden";
       }

       //Hide Community
       for (let i = (communityLength -1); i > -1; i--) {
         elementsListCommunity[i].className = "communityBlipHidden";
       }
 
       //Hide Business
       for (let i = (businessLength -1); i > -1; i--) {
         elementsListBusiness[i].className = "businessBlipHidden";
       }
     }   
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
  


}

