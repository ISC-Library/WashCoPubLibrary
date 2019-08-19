import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Pages
import { CalendarPage } from '../calendar/calendar';

//Import Provider
import { AdminAuthProvider } from '../../providers/admin-auth/admin-auth';
import { EventTitleCheckProvider } from '../../providers/event-title-check/event-title-check'

@Component({
  selector: 'page-modify-events',
  templateUrl: 'modify-events.html',
})

export class ModifyEventsPage {

  //Create the eventsRef variable: give it the type of "AngularFireList" 
  eventsRef: AngularFireList<any>;

  //Class variable to hold the values gathered from the service 
  events: Observable<any[]>;

  //Declare the databaseFilter variable
  databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');

  //Array to hold titles converted from the observable 
  titlesArray: any;

  //Array to hold start Times convered from the observable
  startTimeArray: any;

  //Declare "eventSubmission" as a FormGroup to use it for validation
  modifyEventSubmission: FormGroup;
  submitAttempt: boolean = false;
  control: FormControl;


  originalTitle: any;

  //Variable to hold the "event" passed from the "calendar" page
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

  //#region constructor
  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private calendar: Calendar,
    afDatabase: AngularFireDatabase,
    public AdminAuthProvider: AdminAuthProvider,
    public EventTitleCheckSvc: EventTitleCheckProvider,
    public formBuilder: FormBuilder) {

    //This is the reference to which portion of the database you want to access 
    this.eventsRef = afDatabase.list('events');

    //Set the value of the class variable "event" to the event passed 
    this.event = this.navParams.get('event');

    //Convert titlesArray from type "any" to array[]
    this.titlesArray = []

    //Convert startTimeARray from type "any" to array[]
    this.startTimeArray = []

    //Get all the events
    this.events = this.EventTitleCheckSvc.getEvents(this.databaseFilter);

    //Reformat date time picker variables
    //We had to re-merge the values of date / time as they come in from the database seperated
    //We do this so the view will load the full date / time of the suggested event being modified 
    //As [(ngModel)] can only model one value at a time, meaning it has to be a concatenated date/time
    this.event.startDate = (this.event.startDate + "T" + this.event.startTime)

    this.event.endDate = (this.event.endDate + "T" + this.event.endTime)

    //Setup the form builder group for validation of the eventSubmission form
    this.modifyEventSubmission = formBuilder.group({
      //The following title example allows regex
      // title: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      title: ['', Validators.compose([Validators.maxLength(30),  Validators.pattern(`^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!.@#$&*-_|"'?/ ]+$`), Validators.required])],
      location: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(`^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!.@#$&*-_|"'?/ ]+$`), Validators.required])],
      category: ['', Validators.compose([Validators.pattern('^(?!\s*$).+'), Validators.required])],
      notes: ['', Validators.compose([Validators.maxLength(250), Validators.pattern(`^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!.@#$&*-_|"'?/ ]+$`), Validators.required])],
      startDate: ['', Validators.compose([Validators.pattern('^(?!\s*$).+'), Validators.required])],
      endDate: ['', Validators.compose([Validators.pattern('^(?!\s*$).+'), Validators.required])],
    })

    this.events.subscribe((data) => {
      //Set the .subscription "data" values that are returned to the array "titlesArray[]" and "starTimeArray[]"
      this.titlesArray = data
      this.startTimeArray = data
    });

    this.originalTitle = this.event.title
  }
  //#endregion


  //#region navGaurds
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  ////////  Below are the NavGaurds []][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]

  //Gatekeeper: Checks for authentication of admin
  ionViewWillEnter() {

  }

  ionViewCanEnter() {
    //console.log("can enter")
    if (this.isAdmin() == false) {
      return false
    }
  }

  //Check if user is administrator 
  isAdmin() {
    if (this.AdminAuthProvider.isLoggedIn()) {
      //console.log(this.AdminAuthProvider.currentUser)

      //If logged in and an admin return true
      if (this.AdminAuthProvider.currentUser.role === 0) {
        //console.log("true")
        return true;
      }
      //If logged in but not an admin return false
      else {
        //console.log("false")
        return false;
      }
    }
    //If not logged in at all return false
    else {
      //console.log("false")
      return false;
    }
  }
  //#endregion


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Calendar is loading...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
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
    //Convert to lower and remove spaces
    //This checks only that the characters linearly are not the same and ignores case and spacing
    let convertedEventTitle = (this.event.title).replace(/\s/g, '').toLowerCase();
    this.originalTitle = (this.originalTitle).replace(/\s/g, '').toLowerCase();

    if (this.modifyEventSubmission.dirty && this.originalTitle.includes(convertedEventTitle) == false) {
      for (let i = 0; i < this.titlesArray.length; i++) {
        let convertedTitleFromArray = (this.titlesArray[i].title).replace(/\s/g, '').toLowerCase();

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
  }


  checkStartTime() {
    //Seperate the date and time in the "event.startTime"  variable
    //NOTE the "event" object is being bound to whatever the user is typing at the time
    this.event.startTime = this.event.startDate.split("T").pop()

    //For now we are not dealing with the timezone offset
    //Which is currently appending itself to the dateTime as "00Z"
    //For now we will just cut that off
    this.event.startTime = this.event.startTime.substring(0, this.event.startTime.length - 4);

    //The view is bound to the event.startDate, which by default holds both the date and time
    //If we split the date off, the view will not be bound to a date / time... only a date so the time will now show
    //Create a temp variable to use for comparison to avoid modifying the view
    let startDate = this.event.startDate.split("T", 1).pop();

    for (let i = 0; i < this.startTimeArray.length; i++) {
      //If the day is the same
      if (startDate == this.startTimeArray[i].startDate) {
        //And the start time is the same
        if (this.event.startTime == this.startTimeArray[i].startTime) {
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

  validateInput(eventID) {
    //If the titles are not the same
    //&& the submit form has been modified by the user
    //&& the submission form returns valid
    if (!this.checkTitle() && this.modifyEventSubmission.dirty && this.modifyEventSubmission.status == "VALID") {
      //Save the data
      this.updateEvent(eventID)
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
        this.event.startDate.length == 0 || this.event.endDate.length == 0) {
        //If the "all fields requried .. field" is not in an error state put it in one
        //console.log(this.event.category.length)
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


  //#region UpdateEvent
  updateEvent(eventID) {
    //Seperate the date and time in the "event.startDate" and "event.endDate" variables 
    this.event.startTime = this.event.startDate.split("T").pop();
    this.event.endTime = this.event.endDate.split("T").pop();

    //For now we are not dealing with the timezone offset
      //Which is currently appending itself to the dateTime as "00Z"
        //For now we will just cut that off
        this.event.startTime = this.event.startTime.substring(0, this.event.startTime.length - 4);
        this.event.endTime = this.event.endTime.substring(0, this.event.endTime.length - 4);

    //Re-declare the "event.startDate" and "event.endDate" to be just the date, not removing the time portion
    this.event.startDate = this.event.startDate.split("T", 1).pop();
    this.event.endDate = this.event.endDate.split("T", 1).pop();

    let prompt = this.alertCtrl.create({
      // title: 'Song Name',
      message: "Do you wish to make these changes?",

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },

        {
          text: 'Save',
          handler: data => {
            this.eventsRef.update(eventID, {
              title: this.event.title,
              location: this.event.location,
              category: this.event.category,
              notes: this.event.notes,
              startDate: this.event.startDate,
              endDate: this.event.endDate,
              startTime: this.event.startTime,
              endTime: this.event.endTime
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
  //#endregion
}
