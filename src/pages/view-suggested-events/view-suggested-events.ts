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
    }, 2000);
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


  addSuggestedEvent(item) {
    console.log("Add");
    //The "item" has a property called "id" nested under "item.item.id"
      //We can use this property to see which item in the list was selected 
        //The item.item.id is a list, which is in the same order as the array of events, but not 0 indexed
          //Set the index to the value of the "item.item.id" - 1, to account for the non-zero indexing
          let index = (item.item.id -1);
        
    //Call the save function, passing in the newly calculated index for the array 
    this.save(item, index);
  };

  modifySuggestedEvent(item) {
    console.log("Modify");
  };


  deleteSuggestedEvent(item) {
    console.log("Delete");
  };
  

  //Create New Events 
  save(item, index) {
    console.log("save")
    console.log("index")
    console.log(index)
    console.log("item id")
    console.log(item.item.id)

    //Set the values of event object to those of the "allEvents" array...
      //Specified by the re-calculated "index" passed in from the user selection when they chose to add an event
    this.event.title = this.allEvents[index].title, 
    this.event.location = this.allEvents[index].location, 
    this.event.notes = this.allEvents[index].notes, 
    this.event.startDate = this.allEvents[index].startDate,
    this.event.endDate = this.allEvents[index].endDate, 
    this.event.startTime = this.allEvents[index].startTime, 
    this.event.endTime = this.allEvents[index].endTime

    //The item.itme.id is apparently global, so its value moves around from each page that uses it 
      //This means if we do not set it back to 0 after it is used, it will mess up the other pages uses of it
      item.item.id = 0
    
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
};
