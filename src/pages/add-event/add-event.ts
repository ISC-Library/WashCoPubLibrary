import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/observable';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Providers
import { AdminAuthProvider } from '../../providers/admin-auth/admin-auth';

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
    public navParams: NavParams,
    private calendar: Calendar,
    afDatabase:AngularFireDatabase,
    public AdminAuthProvider: AdminAuthProvider) {
      
    //This is the reference to which portion of the database you want to access 
    this.eventsRef = afDatabase.list('events');
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

 
  //Create New Events 
  save() {
    //Seperate the date and time in the "event.startDate" and "event.endDate" variables 
    this.event.startTime = this.event.startDate.split("T").pop();
    this.event.endTime = this.event.endDate.split("T").pop();

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