import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/observable';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  
  //Create the usernames variable: give it the type of "AngularFireList"
  //This is for database troubleshooting and dummy data entry 
  eventsRef: AngularFireList<any>;
  events: Observable<any[]>;
  
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
  }


  // So this is the next portion of the walkthrough on https://www.djamware.com/post/5a0bb8f780aca75eadc12d6b/build-ionic-3-angular-5-calendar-ui-with-event-integration , 
  // I stopped with it at this point to try and figure out how to send the data on to firebase. Still working on that.
  // I was looking at using the button on the page that calls the save() function to also call for a fbPushData() function. I read that you might able to run two or more if you
  // go with:
  //(ng-click) ="save(); fbPushData()". However, there may be a way to push the data inside of the save() function that I'm just not aware of.

  //So all I'm working on now is trying to send the data to FB from this point. Then I guess once the data is sent and stored, we'll see how we're supposed to pull
  //it back to the application and display it on the calendar. I think I have to create a handler to ship the data out
  
  
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