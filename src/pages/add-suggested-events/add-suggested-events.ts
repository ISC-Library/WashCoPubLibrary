import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Provider
import { EventTitleCheckProvider } from '../../providers/event-title-check/event-title-check'
import { HomePage } from '../home/home';

@Component({
  selector: 'page-add-suggested-events',
  templateUrl: 'add-suggested-events.html',
})

export class AddSuggestedEventsPage {

  //Create the eventsRef variable: give it the type of "AngularFireList" 
  eventsRef: AngularFireList<any>;
  //The events observable holds all the data pulled from the database 
  events: Observable<any[]>;
  
  //Declare the databaseFilter variable
  databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');
  
  //Array to hold titles converted from the observable 
  titlesArray: any;

  //Array to hold start Times convered from the observable
  startTimeArray: any;

  //Declare "suggestedEventSubmission" as a FormGroup to use it for validation
  suggestedEventSubmission: FormGroup;
  submitAttempt: boolean = false;
  control: FormControl;

  //The "event" is an object that is used to format the data being pushed into the database 
  event = { 
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
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private calendar: Calendar,
    afDatabase: AngularFireDatabase,
    public EventTitleCheckSvc: EventTitleCheckProvider,
    public formBuilder: FormBuilder) {

    //This is the reference to which portion of the database you want to access 
    this.eventsRef = afDatabase.list('suggestedEvents');

    //Convert titlesArray from type "any" to array[]
    this.titlesArray = []

    //Convert startTimeARray from type "any" to array[]
    this.startTimeArray = []

    //Get all the events
    this.events = this.EventTitleCheckSvc.getEvents(this.databaseFilter);

    //Setup the form builder group for validation of the suggestedEventSubmission form
    this.suggestedEventSubmission = formBuilder.group({
      //The following title example allows regex
      // title: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      //You have to use the slash twice "\\" to escape regex in javascript
      title: ['', Validators.compose([Validators.maxLength(30),  Validators.pattern(`^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!.@#$&*-_|"'?/ ]+$`), Validators.required])],
      location: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(`^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!.@#$&*-_|"'?/ ]+$`), Validators.required])],
      category: ['', Validators.compose([Validators.pattern('^(?!\s*$).+'), Validators.required])],
      notes: ['', Validators.compose([Validators.maxLength(250), Validators.pattern(`^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!.@#$&*-_|"'?/ ]+$`), Validators.required])],
      startDate: ['', Validators.compose([Validators.pattern('^(?!\s*$).+'), Validators.required])],
      endDate: ['', Validators.compose([Validators.pattern('^(?!\s*$).+'), Validators.required])],
      contactName: ['', Validators.compose([Validators.pattern('^(?!\\s*$).+'), Validators.required])],
      contactEmail: ['', Validators.compose([Validators.pattern('^([a-zA-Z0-9_\\.-])+@([a-zA-Z0-9-])+\\.([a-zA-Z0-9-]){2,6}'), Validators.required])],
      contactPhone: ['', Validators.compose([Validators.pattern('^(\\s*)?(\\+[0-9]{1,2}\\s)?\\(?[0-9]{3}\\)?[\\s.-]?[0-9]{3}[\\s.-]?[0-9]{4}(\\s*)?$'), Validators.required])]
    })

    this.events.subscribe((data) => {
      //Set the .subscription "data" values that are returned to the array "titlesArray[]" and "starTimeArray[]"
      this.titlesArray = data
      this.startTimeArray = data
    });

  }
  //#endregion

  ionViewDidLeave() {

  }

  //#region DataValidation
  //Popup Message for the help icon (title)
  titleErrorHelpButton() {
    let toast = this.toastCtrl.create({
      message: 'The title of this event is the same as another event on the same day!',
      duration: 4000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }

  //Popup Message for the warning icon (startTime)
  startTimeWarningHelpButton() {
    let toast = this.toastCtrl.create({
      message: 'This event starts at the same time as another event on the same day, you may want to consider modifying it.',
      duration: 5000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
  //Check the title the user is entering 
  checkTitle() {
    //Compare the title being entered to all event titles (which are now stored in titleArray)
    for (let i = 0; i < this.titlesArray.length; i++) {
      //Convert to lower and remove spaces
      //This checks only that the characters linearly are not the same and ignores case and spacing
      let convertedTitleFromArray = (this.titlesArray[i].title).replace(/\s/g, '').toLowerCase();
      let convertedEventTitle = (this.event.title).replace(/\s/g, '').toLowerCase();

      //Re-declare the "event.startDate" and "event.endDate" to be just the date, not removing the time portion
      let convertedStartDateFromArray = this.event.startDate.split("T", 1).pop();

      //If the title they are typing is matches any given title in the events array...
      //And the startDates are the same 
      //Meaning they cannot have an event with the same title as another event on that day
      if (convertedEventTitle != "") {
        if (convertedTitleFromArray.includes(convertedEventTitle) && this.titlesArray[i].startDate == convertedStartDateFromArray) {
          document.getElementById("titleInput").className = "titleInputInvalid"
          return true
        } else {
          document.getElementById("titleInput").className = "titleInputValid"
        }
      }
    }
  }
  

  checkStartTime() {
    //Seperate the date and time in the "suggestedEvent.startTime"  variable
      //NOTE the "suggestedEvent" object is being bound to whatever the user is typing at the time
    let proposedStartTime = this.event.startDate.split("T").pop()
    
    //For now we are not dealing with the timezone offset
      //Which is currently appending itself to the dateTime as "00Z"
        //For now we will just cut that off
    proposedStartTime = this.event.startTime.substring(0, this.event.startTime.length - 4);
   
    //The view is bound to the event.startDate, which by default holds both the date and time
      //If we split the date off, the view will not be bound to a date / time... only a date so the time will now show
        //Create a temp variable to use for comparison to avoid modifying the view
    let startDate = this.event.startDate.split("T", 1).pop();

    for (let i = 0; i < this.startTimeArray.length; i++) {
        //If the day is the same
        if (startDate == this.startTimeArray[i].startDate) {
          //And the start time is the same
          if (proposedStartTime == this.startTimeArray[i].startTime) {
            //Throw it up
            document.getElementById("startDatePicker").className = "sameTime"
            document.getElementById("startTimeWarningIcon").style.visibility = "visible"
            return true
          } else {
            document.getElementById("startDatePicker").className = "differentTime"
            document.getElementById("startTimeWarningIcon").style.visibility = "hidden"
          }
        }
    }
  }

validateInput() {
  //If the titles are not the same
    //&& the submit form has been modified by the user
      //&& the submission form returns valid
  if (!this.checkTitle() && this.suggestedEventSubmission.dirty && this.suggestedEventSubmission.status == "VALID") {
    //Save the data
    this.save()
  } else {
    var message;
    
   //Check Title / Location Length (we already have custom css to show if the title is the same as another)
   if (this.event.title.length > 30 || this.event.location.length > 30) {
    message = "Neither your title nor location can be more than 30 characters."
  }

  //Check Notes Length 
  if (this.event.notes.length > 250) {
    message = "Your notes cannot be more than 250 characters."
  }

    if (this.event.title.length == 0 || this.event.location.length == 0 ||
        this.event.notes.length == 0 || this.event.category.length == 0 || 
        this.event.startDate.length == 0 || this.event.endDate.length == 0 ||
        this.event.contactName.length ==0 || this.event.contactEmail.length == 0 || 
        this.event.contactPhone.length == 0) {
          //If the "all fields requried .. field" is not in an error state put it in one
          if (document.getElementById("allEventsRequired")) {
          document.getElementById("allEventsRequired").id = "allEventsRequiredError"
          }
      } 
   
    let toast = this.toastCtrl.create({
      message,
      duration: 4000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
//#endregion

  
  //#region SaveSuggestedEvent
  //Create New Events 
  save() {
    //console.log("save invoked");
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
                //console.log('Cancel clicked');
              }
            },
            {
              //Pushing the data to firebase!!!
              text: 'Confirm',
              handler: data => {

                //Seperate the date and time in the "event.startDate" and "event.endDate" variables 
                //Seperate the date and time in the "event.startTime" and "event.endTime" variables 
                this.event.startTime = this.event.startDate.split("T").pop()
                this.event.endTime = this.event.endDate.split("T").pop()

                //For now we are not dealing with the timezone offset
                  //Which is currently appending itself to the dateTime as "00Z"
                    //For now we will just cut that off
                this.event.startTime = this.event.startTime.substring(0, this.event.startTime.length - 4);
                this.event.endTime = this.event.endTime.substring(0, this.event.endTime.length - 4);

                //console.log(this.event.startTime)
                //console.log(this.event.endTime)

                // this.event.startTime = this.event.startDate.split(0).pop();
                // this.event.endTime = this.event.endDate.split("0").pop();

                //Re-declare the "event.startDate" and "event.endDate" to be just the date, not removing the time portion
                this.event.startDate= this.event.startDate.split("T", 1).pop();
                this.event.endDate = this.event.endDate.split("T", 1).pop();

                //console.log(this.event.startDate)
                //console.log(this.event.startDate)

                //Remove spaces from the email
                this.event.contactEmail.replace(/\s/g, "")
                //Remove spaces and special characters from the "contactPhone"
                this.event.contactPhone.replace(/\+|-|\(|\)|\s/g, "")

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
                  endTime: this.event.endTime,
                  contactName: this.event.contactName,
                  contactEmail: this.event.contactEmail,
                  contactPhone: this.event.contactPhone
                });
                //Navigate to the homepage
                this.navCtrl.setRoot(HomePage);
              }
            }
          ]
        });
        alert.present();
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
  //#endregion
  
}
