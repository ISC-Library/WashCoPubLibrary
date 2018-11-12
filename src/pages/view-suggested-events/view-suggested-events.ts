import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Item } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemSliding } from 'ionic-angular';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Pages

//Import Provider
import { SuggestedEventsServiceProvider } from '../../providers/add-suggested-events/add-suggested-events'


@Component({
  selector: 'page-view-suggested-events',
  templateUrl: 'view-suggested-events.html',
})

export class ViewSuggestedEventsPage {

//Create the eventsRef variable: give it the type of "AngularFireList" 
eventsRef: AngularFireList<any>;
//The events observable holds all the data pulled from the database 
events: Observable<any[]>;
//Declare the database filter variable
    //Dynamic: Can change so that dynamic filters can be passed to the database 
databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');

//Declare list (array) to hold all events, used to pass event dates to calendar for CSS purposes (THE DOTS!)
allEvents: any;

//The "event" is an object that is used to format the data being pushed into the database 
suggestedEvent = { 
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
  public SuggestedEventSvc: SuggestedEventsServiceProvider,
  public loadingCtrl: LoadingController,
  afDatabase:AngularFireDatabase,) {

    //This.allEvents needs to be converted to any array 
    this.allEvents = [];

    //This is the reference to which portion of the database you want to access 
    this.eventsRef = afDatabase.list('events');

    //Set the "events" Observable equal to a call to the database unfiltered (all events)
      //Use the "databaseFilter" to allow it to retrieve the default / unfiltered set (all events)
    this.events = this.SuggestedEventSvc.addEvents(this.databaseFilter)

    //We must .subscribe to the "eventsForCSS" Observable before attempting to do anything with its values
      //This is because the code is being run asynchronously... meaning the line of code may not complete directly after it is called
        //.Subscribe will let us know when the code is finished executing, by not allowing its inner portion to execute until then
          //This allows us to only attempt to access "eventsForCSS" data once it has "promised" us that the data is now there  
          this.events.subscribe((data) => {
            //Set the .subscription "data" values that are returned to the array "allEvents[]"
            this.allEvents = data;
            console.log(this.allEvents)
          });
}



  ionViewDidLoad() {
    //Show a loading spinner to ensure the data is loaded rather than just coming into a blank page 
    this.presentLoadingDefault()
    console.log("suggested load")
  };

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

  //Custom Spinner code for when we decide to tailor make one.
  // presentLoadingCustom() {
  //   let loading = this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: `
  //       <div class="custom-spinner-container">
  //         <div class="custom-spinner-box"></div>
  //       </div>`,
  //     duration: 5000
  //   });
  
  //   loading.onDidDismiss(() => {
  //     console.log('Dismissed loading');
  //   });
  
  //   loading.present();
  // };


  addSuggestedEvent(event) {
    console.log("Add");
    //console.log(event)

    //Call the save function, passing in the newly calculated index for the array 
    this.save(event);
  };

  modifySuggestedEvent(item) {
    console.log("Modify");
  };


  deleteSuggestedEvent(item) {
    console.log("Delete");
  };
  

  //Create New Events 
  save(event) {

  for (let i = 0; i < this.allEvents.length; i++) {

    if (event.id == this.allEvents[i].id) {
      //Set the values of event object to those of the "allEvents" array...
      //Specified by the re-calculated "index" passed in from the user selection when they chose to add an event
    this.suggestedEvent.title = this.allEvents[i].title, 
    this.suggestedEvent.location = this.allEvents[i].location, 
    this.suggestedEvent.notes = this.allEvents[i].notes, 
    this.suggestedEvent.startDate = this.allEvents[i].startDate,
    this.suggestedEvent.endDate = this.allEvents[i].endDate, 
    this.suggestedEvent.startTime = this.allEvents[i].startTime, 
    this.suggestedEvent.endTime = this.allEvents[i].endTime
    }
  };
    
    this.calendar.createEvent(
      this.suggestedEvent.title, 
      this.suggestedEvent.location, 
      this.suggestedEvent.notes, 
      new Date(this.suggestedEvent.startDate), 
      new Date(this.suggestedEvent.endDate)).then(
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
                  title: this.suggestedEvent.title,
                  location: this.suggestedEvent.location,
                  notes: this.suggestedEvent.notes,
                  startDate: this.suggestedEvent.startDate,
                  endDate: this.suggestedEvent.endDate,
                  startTime: this.suggestedEvent.startTime,
                  endTime: this.suggestedEvent.endTime
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
};
