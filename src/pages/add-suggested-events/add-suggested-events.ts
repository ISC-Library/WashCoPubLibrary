import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/observable';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'page-add-suggested-events',
  templateUrl: 'add-suggested-events.html',
})

export class AddSuggestedEventsPage {

  eventsRef: AngularFireList<any>;
  events: Observable<any[]>;
  
  event = { title: "", location: "", notes: "", startDate: "", endDate: "", startTime:"", endTime:"" };
  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    afDatabase:AngularFireDatabase) {
      
      //This is the reference to which portion of the database you want to access 
      this.eventsRef = afDatabase.list('suggestedEvents');
  }


  //Create New Events 
  save() {
    console.log("save invoked");
    this.calendar.createEvent(this.event.title, this.event.location, this.event.notes, new Date(this.event.startDate), new Date(this.event.endDate)).then(
      (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Suggested Event saved successfully',
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
                  endDate: this.event.endDate
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