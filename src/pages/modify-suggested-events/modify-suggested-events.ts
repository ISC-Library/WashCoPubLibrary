import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Pages
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-modify-suggested-events',
  templateUrl: 'modify-suggested-events.html',
})

export class ModifySuggestedEventsPage {

  
  //Create the suggestedEventsRef variable: give it the type of "AngularFireList" 
  suggestedEventsRef: AngularFireList<any>;

  //Class variable to hold the values gathered from the service 
  suggestedEvents: Observable<any[]>;

  //Variable to hold the "suggestedEvent" passed from the "calendar" page
    //The "suggestedEvent" is an object that is used to format the data being pushed into the database 
  suggestedEvent = { 
    title: "", 
    location: "", 
    category: "",
    notes: "",
    startDate: "",
    endDate: "", 
    startTime: "", 
    endTime: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  };

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private calendar: Calendar,
    afDatabase:AngularFireDatabase) {
      
    //This is the reference to which portion of the database you want to access 
    this.suggestedEventsRef = afDatabase.list('suggestedEvents');
  
    //Set the value of the class variable "suggestedEvent" to the suggestedEvent passed 
    this.suggestedEvent = this.navParams.get('event');
    console.log(this.suggestedEvent);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifySuggestedEventsPage');
  }

  ionViewDidLeave() {
   
  }

  //Loading Spinner
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Suggested Events are loading...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  };


  updateSuggestedEvent(suggestedEventID){
    console.log(suggestedEventID)
    //Seperate the date and time in the "suggestedEvent.startDate" and "suggestedEvent.endDate" variables 
    this.suggestedEvent.startTime = this.suggestedEvent.startDate.split("T").pop();
    this.suggestedEvent.endTime = this.suggestedEvent.endDate.split("T").pop();

    //Re-declare the "suggestedEvent.startDate" and "suggestedEvent.endDate" to be just the date, not removing the time portion
    this.suggestedEvent.startDate= this.suggestedEvent.startDate.split("T", 1).pop();
    this.suggestedEvent.endDate = this.suggestedEvent.endDate.split("T", 1).pop();

    let prompt = this.alertCtrl.create({
      // title: 'Song Name',
      message: "Do you wish to make these changes?",
      
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
            this.suggestedEventsRef.update(suggestedEventID, {
              title: this.suggestedEvent.title,
                location: this.suggestedEvent.location,
                category: this.suggestedEvent.category,
                notes: this.suggestedEvent.notes,
                startDate: this.suggestedEvent.startDate,
                endDate: this.suggestedEvent.endDate,
                startTime: this.suggestedEvent.startTime,
                endTime: this.suggestedEvent.endTime,
                contactName: this.suggestedEvent.contactName,
                contactEmail: this.suggestedEvent.contactEmail,
                contactPhone: this.suggestedEvent.contactPhone
            });
            //Build the nav control pop and the loading spinner into the save button
            this.navCtrl.pop();
          }
        }
      ]
    });
    //Present the prompt with the buttons which have been built previously
    prompt.present();
  }
}

