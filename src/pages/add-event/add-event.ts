import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import {AngularFireDatabase} from '@angular/fire/database';
import { Title } from '@angular/platform-browser';

/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  
  event = { title: "", location: "", notes: "", startDate: "", endDate: "", startTime:"", endTime:"" };
  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    afDatabase:AngularFireDatabase) {
  }


  // So this is the next portion of the walkthrough on https://www.djamware.com/post/5a0bb8f780aca75eadc12d6b/build-ionic-3-angular-5-calendar-ui-with-event-integration , 
  // I stopped with it at this point to try and figure out how to send the data on to firebase. Still working on that.
  // I was looking at using the button on the page that calls the save() function to also call for a fbPushData() function. I read that you might able to run two or more if you
  // go with:
  //(ng-click) ="save(); fbPushData()". However, there may be a way to push the data inside of the save() function that I'm just not aware of.

  //So all I'm working on now is trying to send the data to FB from this point. Then I guess once the data is sent and stored, we'll see how we're supposed to pull
  //it back to the application and display it on the calendar. I think I have to create a handler to ship the data out

  save() {
    this.calendar.createEvent(this.event.title, this.event.location, this.event.notes, new Date(this.event.startDate), new Date(this.event.endDate)).then(
      (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Event saved successfully',
          buttons: ['Ok'],
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