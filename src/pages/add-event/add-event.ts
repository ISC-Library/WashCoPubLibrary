import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastController } from 'ionic-angular';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Providers
import { AdminAuthProvider } from '../../providers/admin-auth/admin-auth';
import { EventTitleCheckProvider } from '../../providers/event-title-check/event-title-check'

//Import Pages
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})

export class AddEventPage {
  
  //Create the eventsRef variable: give it the type of "AngularFireList" 
  eventsRef: AngularFireList<any>;
  //The events observable holds all the data pulled from the database 
  events: Observable<any[]>;
  
  //Array to hold titles converted from the observable 
  titlesArray: any;

  //Array to hold start Times convered from the observable
  startTimeArray: any;

  //Declare the databaseFilter variable
  databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');
  
  //The "event" is an object that is used to format the data being pushed into the database 
  event = { 
    title: "", 
    location: "", 
    category: "",
    notes: "", 
    startDate: "",
    endDate: "", 
    startTime: "", 
    endTime: "" 
  };

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private calendar: Calendar,
    afDatabase:AngularFireDatabase,
    public AdminAuthProvider: AdminAuthProvider,
    public EventTitleCheckSvc : EventTitleCheckProvider) {
      
    //This is the reference to which portion of the database you want to access 
    this.eventsRef = afDatabase.list('events');

    //Convert titlesArray from type "any" to array[]
    this.titlesArray = []

    //Convert startTimeARray from type "any" to array[]
    this.startTimeArray = []

    //Get all the events
    this.events = this.EventTitleCheckSvc.getEvents(this.databaseFilter);
  
    this.events.subscribe((data)=> {
      //Set the .subscription "data" values that are returned to the array "titlesArray[]" and "starTimeArray[]"
      this.titlesArray = data
      this.startTimeArray = data
    });
  }

  //Gatekeeper: Checks for authentication of admin
  ionViewWillEnter() {
    if (this.AdminAuthProvider.isLoggedIn()) {
      if (this.AdminAuthProvider.isAdmin()) {
        //console.log("admin")
        this.navCtrl.push(AddEventPage);
      } else {
        console.log("user")
        this.navCtrl.push(CalendarPage);
      }
    } 
    //console.log(this.AdminAuthProvider.currentUser.name)
  }

  //Popup Message for the help icon (title)
  titleErrorHelpButton() {
    let toast = this.toastCtrl.create({
      message: 'The title of this event is the same as another event on the same day!',
      duration: 4000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  startTimeWarningHelpButton() {
    let toast = this.toastCtrl.create({
      message: 'This event starts at the same time as another event on the same day, you may want to consider modifying it.',
      duration: 4000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
  //Check the title the user is entering 
  checkTitle() {
    //Compare the title being entered to all event titles (which are now stored in titleArray)
    for (let i = 0; i < this.titlesArray.length; i++) {
      //Convert to lower and remove spaces
        //This checks only that the characters linearly are not the same and ignores case and spacing
      let convertedTitleFromArray = (this.titlesArray[i].title).replace(/\s/g,'').toLowerCase();
      let convertedEventTitle = (this.event.title).replace(/\s/g,'').toLowerCase();
      
      //Re-declare the "event.startDate" and "event.endDate" to be just the date, not removing the time portion
      let convertedStartDateFromArray = this.event.startDate.split("T", 1).pop();
    
      //If the title they are typing is matches any given title in the events array...
        //And the startDates are the same 
          //Meaning they cannot have an event with the same title as another event on that day
      if (convertedTitleFromArray.includes(convertedEventTitle) && this.titlesArray[i].startDate == convertedStartDateFromArray) {
        document.getElementById("titleInput").className = "titleInputInvalid"
        return true
      } else {
        document.getElementById("titleInput").className = "titleInputValid"
      }
    }
  }

  checkStartTime() {
   //Seperate the date and time in the "event.startTime"  variable
   let convertedStartTimeFromArray = this.event.startDate.split("T").pop()

   //For now we are not dealing with the timezone offset
     //Which is currently appending itself to the dateTime as "00Z"
       //For now we will just cut that off
   //convertedStartTimeFromArray = convertedStartTimeFromArray.substring(0, convertedStartTimeFromArray.length - 4);
   
   for (let i = 0; i < this.startTimeArray.length; i++) {
      if (convertedStartTimeFromArray == this.startTimeArray[i].startTime) {
        document.getElementById("startDatePicker").className = "sameTime"
        return true
      } else {
        document.getElementById("startDatePicker").className = "differentTime"
      }
    }
  }
 


  //Create New Events 
  save() {
    //Seperate the date and time in the "event.startTime" and "event.endTime" variables 
    this.event.startTime = this.event.startDate.split("T").pop()
    this.event.endTime = this.event.endDate.split("T").pop()

    //For now we are not dealing with the timezone offset
      //Which is currently appending itself to the dateTime as "00Z"
        //For now we will just cut that off
    this.event.startTime = this.event.startTime.substring(0, this.event.startTime.length - 4);
    this.event.endTime = this.event.endTime.substring(0, this.event.endTime.length - 4);

    console.log(this.event.startTime)
    console.log(this.event.endTime)

    // this.event.startTime = this.event.startDate.split(0).pop();
    // this.event.endTime = this.event.endDate.split("0").pop();

    //Re-declare the "event.startDate" and "event.endDate" to be just the date, not removing the time portion
    this.event.startDate= this.event.startDate.split("T", 1).pop();
    this.event.endDate = this.event.endDate.split("T", 1).pop();

    console.log("save invoked");
    this.calendar.createEvent(
      this.event.title, 
      this.event.location, 
      this.event.notes, 
      new Date(this.event.startDate), 
      new Date(this.event.endDate)).then(
      (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Event saved successfully',
          // buttons: ['Ok'],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              //Pushing the data to firebase!!!
              text: 'Save',
              handler: data => {
                const newEventsRef = this.eventsRef.push({});
       
                newEventsRef.set({
                  id: newEventsRef.key,
                  title: this.event.title,
                  location: this.event.location,
                  category: this.event.category,
                  notes: this.event.notes,
                  startDate: this.event.startDate,
                  endDate: this.event.endDate,
                  startTime: this.event.startTime,
                  endTime: this.event.endTime
                });
              }
            }
          ]
        });
        alert.present();
        this.navCtrl.pop();
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    );
    }
  }