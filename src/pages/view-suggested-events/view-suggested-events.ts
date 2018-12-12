import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Item } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemSliding } from 'ionic-angular';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Pages
import { ModifySuggestedEventsPage } from '../modify-suggested-events/modify-suggested-events'

//Import Provider
import { SuggestedEventsServiceProvider } from '../../providers/add-suggested-events/add-suggested-events'


@Component({
  selector: 'page-view-suggested-events',
  templateUrl: 'view-suggested-events.html',
})

export class ViewSuggestedEventsPage {

//Create the eventsRef variable: give it the type of "AngularFireList" 
eventsRef: AngularFireList<any>;
suggestedEventsRef: AngularFireList<any>;

//The suggestedEvents observable holds all the data pulled from the database 
suggestedEvents: Observable<any[]>;
//Declare the database filter variable
    //Dynamic: Can change so that dynamic filters can be passed to the database 
databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');

//Declare list (array) to hold all events, used to pass event dates to calendar for CSS purposes (THE DOTS!)
allEvents: any;

//The "event" is an object that is used to format the data being pushed into the database 
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

//#region constructor
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
    this.suggestedEventsRef = afDatabase.list('suggestedEvents');

    //Set the "suggestedEvents" Observable equal to a call to the database unfiltered (all events)
      //Use the "databaseFilter" to allow it to retrieve the default / unfiltered set (all events)
    this.suggestedEvents = this.SuggestedEventSvc.addEvents(this.databaseFilter)

    this.suggestedEvents.subscribe((data) => {
      //Set the .subscription "data" values that are returned to the array "allEvents[]"
      this.allEvents = data;
      console.log(this.allEvents)
    });
  }
  //#endregion

//#region NavGaurds
  ionViewDidLoad() {
  
  };

  ionViewDidEnter() {
    this.presentLoadingDefault()
  }
//#endregion

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

//#region EventInteraction
  addSuggestedEvent(suggestedEvent) {
    //Call the save function, passing in the newly calculated index for the array 
    this.save(suggestedEvent);
  };

  // Navigate to the "ModifyEvent" page
    //The user selects modify button on the suggestedEvent which they wish to modify 
      //The event data for that specific suggestedEvent is passed, which we will forward to the "ModifyEvent" page
      modifySuggestedEvent(suggestedEvent) {
        this.navCtrl.push(ModifySuggestedEventsPage, {
          suggestedEvent
        });
      }


  deleteSuggestedEvent(suggestedEvent) {
    console.log("Delete");
    //Call the database via the "suggestedEventsRef" and delete the item corresponding to the suggestedEvent.id passed
    this.suggestedEventsRef.remove(suggestedEvent.id);
  };
//#endregion
  
  displayMore() {
    document.getElementById("arrowDropdown").style.display = "none"
    document.getElementById("additionalInfo").style.display = "block"
    document.getElementById("arrowDropup").style.display = "block"
  }

  displayLess() {
    document.getElementById("arrowDropdown").style.display = "block"
    document.getElementById("additionalInfo").style.display = "none"
    document.getElementById("arrowDropup").style.display = "none"
  }

  //Create New Events 
  save(suggestedEvent) {

  console.log(suggestedEvent.id)

  for (let i = 0; i < this.allEvents.length; i++) {

    if (suggestedEvent.id == this.allEvents[i].id) {
      //Set the values of suggestedEvent object to those of the "allEvents" array...
      //Specified by the re-calculated "index" passed in from the user selection when they chose to add an suggestedEvent
      this.suggestedEvent.title = this.allEvents[i].title, 
      this.suggestedEvent.location = this.allEvents[i].location, 
      this.suggestedEvent.category = this.allEvents[i].category,
      this.suggestedEvent.notes = this.allEvents[i].notes, 
      this.suggestedEvent.startDate = this.allEvents[i].startDate,
      this.suggestedEvent.endDate = this.allEvents[i].endDate, 
      this.suggestedEvent.startTime = this.allEvents[i].startTime, 
      this.suggestedEvent.endTime = this.allEvents[i].endTime,
      this.suggestedEvent.contactName = this.allEvents[i].contactName,
      this.suggestedEvent.contactEmail = this.allEvents[i].contactEmail,
      this.suggestedEvent.contactPhone = this.allEvents[i].contactPhone
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
          subTitle: 'Finalize your changes?',
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
                //Push the data into the "events" portion of the database
                const newEventsRef = this.eventsRef.push({});
       
                newEventsRef.set({
                  id: newEventsRef.key,
                  title: this.suggestedEvent.title,
                  location: this.suggestedEvent.location,
                  notes: this.suggestedEvent.notes,
                  startDate: this.suggestedEvent.startDate,
                  endDate: this.suggestedEvent.endDate,
                  startTime: this.suggestedEvent.startTime,
                  endTime: this.suggestedEvent.endTime,
                  contactName: this.suggestedEvent.contactName,
                  contactEmail: this.suggestedEvent.contactEmail,
                  contactPhone: this.suggestedEvent.contactPhone
                });

                //Call the database via the "suggestedEventsRef" and delete the item corresponding to the event.id passed
                this.suggestedEventsRef.remove(suggestedEvent.id);
                this.navCtrl.pop()
              }
            }
          ]
        });
        alert.present() ;
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
