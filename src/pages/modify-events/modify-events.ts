import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Pages
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-modify-events',
  templateUrl: 'modify-events.html',
})

export class ModifyEventsPage {

  //Create the eventsRef variable: give it the type of "AngularFireList" 
  eventsRef: AngularFireList<any>;

  //Class variable to hold the values gathered from the service 
  events: Observable<any[]>;

  //Variable to hold the "event" passed from the "calendar" page
    //The "event" is an object that is used to format the data being pushed into the database 
  event = { 
    title: "", 
    location: "", 
    notes: "", 
    startDate: "",
    endDate: "", 
    startTime: "", 
    endTime: "" 
  };

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    afDatabase:AngularFireDatabase) {
      
    //This is the reference to which portion of the database you want to access 
    this.eventsRef = afDatabase.list('events');
  
    //Set the value of the class variable "event" to the event passed 
    this.event = this.navParams.get('event');
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyEventsPage');
  }

  updateEvent(eventID){
    console.log(eventID)
    //Seperate the date and time in the "event.startDate" and "event.endDate" variables 
    this.event.startTime = this.event.startDate.split("T").pop();
    this.event.endTime = this.event.endDate.split("T").pop();

    //Re-declare the "event.startDate" and "event.endDate" to be just the date, not removing the time portion
    this.event.startDate= this.event.startDate.split("T", 1).pop();
    this.event.endDate = this.event.endDate.split("T", 1).pop();

    let prompt = this.alertCtrl.create({
      // title: 'Song Name',
      message: "Do you wish to make these changes?",
      // inputs: [
      //   {
      //     name: 'title',
      //     placeholder: 'Title',
      //     value: eventTitle
      //   },
      // ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.eventsRef.update(eventID, {
              title: this.event.title,
              location: this.event.location,
              notes: this.event.notes,
              startDate: this.event.startDate,
              endDate: this.event.endDate,
              startTime: this.event.startTime,
              endTime: this.event.endTime
            });
            //Navigate back to calendar once the update is finalized 
            this.navCtrl.push(CalendarPage);
          }
        }
      ]
    });
    prompt.present();
  }

}
