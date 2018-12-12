import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, Loading, DateTime } from 'ionic-angular';
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
import { EventTitleCheckProvider } from '../../providers/event-title-check/event-title-check'

@Component({
  selector: 'page-modify-suggested-events',
  templateUrl: 'modify-suggested-events.html',
})

export class ModifySuggestedEventsPage {

  
  //Create the suggestedEventsRef variable: give it the type of "AngularFireList" 
  suggestedEventsRef: AngularFireList<any>;

  //The events observable holds all the data pulled from the database 
  events: Observable<any[]>;
  
  //Declare the databaseFilter variable
  databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');
  
  //Array to hold titles converted from the observable 
  titlesArray: any;

  //Array to hold start Times convered from the observable
  startTimeArray: any;

  //Declare "suggestedEventSubmission" as a FormGroup to use it for validation
  modifySuggestedEventSubmission: FormGroup;
  submitAttempt: boolean = false;
  control: FormControl;

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

  //#region Constructor
  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private calendar: Calendar,
    afDatabase:AngularFireDatabase,
    public EventTitleCheckSvc: EventTitleCheckProvider,
    public formBuilder: FormBuilder) {
    
    //Set the value of the class variable "suggestedEvent" to the suggestedEvent passed 
    this.suggestedEvent = this.navParams.get('suggestedEvent');

    //This is the reference to which portion of the database you want to access 
    this.suggestedEventsRef = afDatabase.list('suggestedEvents');
  
    //Get all the events
    this.events = this.EventTitleCheckSvc.getEvents(this.databaseFilter);
  
     //Convert titlesArray from type "any" to array[]
    this.titlesArray = []

    //Convert startTimeARray from type "any" to array[]
    this.startTimeArray = []

    //Reformat date time picker variables
     //We had to re-merge the values of date / time as they come in from the database seperated
      //We do this so the view will load the full date / time of the suggested event being modified 
        //As [(ngModel)] can only model one value at a time, meaning it has to be a concatenated date/time
    this.suggestedEvent.startDate=(this.suggestedEvent.startDate + "T" + this.suggestedEvent.startTime)
  
    this.suggestedEvent.endDate=(this.suggestedEvent.endDate + "T" + this.suggestedEvent.endTime)

    
    //Setup the form builder group for validation of the suggestedEventSubmission form
    this.modifySuggestedEventSubmission = formBuilder.group({
      //The following title example allows regex
      // title: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      //You have to use the slash twice "\\" to escape regex in javascript
      title: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!@#$,%&*_ ]+$'), Validators.required])],
      location: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9,_ ]+$'), Validators.required])],
      category: ['', Validators.compose([Validators.pattern('^(?!\\s*$).+'), Validators.required])],
      notes: ['', Validators.compose([Validators.maxLength(250), Validators.pattern('^(?=.*[a-zA-Z0-9].*)[a-zA-Z0-9!@#$,%&*_. ]+$'), Validators.required])],
      startDate: ['', Validators.compose([Validators.pattern('^(?!\\s*$).+'), Validators.required])],
      endDate: ['', Validators.compose([Validators.pattern('^(?!\\s*$).+'), Validators.required])],
      contactName: ['', Validators.compose([Validators.pattern('^(?!\\s*$).+'), Validators.required])],
      contactEmail: ['', Validators.compose([Validators.maxLength(40), Validators.pattern('^([a-zA-Z0-9_\\.-])+@([a-zA-Z0-9-])+\\.([a-zA-Z0-9-]){2,6}'), Validators.required])],
      contactPhone: ['', Validators.compose([Validators.pattern('^(\\s*)?(\\+[0-9]{1,2}\\s)?\\(?[0-9]{3}\\)?[\\s.-]?[0-9]{3}[\\s.-]?[0-9]{4}(\\s*)?$'), Validators.required])]
    })

    //Subscribe to the "event" observable which is being pulled from the current events
    this.events.subscribe((data)=> {
      //Set the .subscription "data" values that are returned to the array "titlesArray[]" and "starTimeArray[]"
      this.titlesArray = data
      this.startTimeArray = data
    });
  };
  //#endregion

  ionViewDidEnter() {
   
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


  //#region DataValidation
  //Popup Message for the help icon (title)
  titleErrorHelpButton() {
    let toast = this.toastCtrl.create({
      message: 'The title of this event is the same as another event on the same day!',
      duration: 4000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
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
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
  //Check the title the user is entering 
  checkTitle() {
    //Compare the title being entered to all suggestedEvent titles (which are now stored in titleArray)
    for (let i = 0; i < this.titlesArray.length; i++) {
      //Convert to lower and remove spaces
      //This checks only that the characters linearly are not the same and ignores case and spacing
      let convertedTitleFromArray = (this.titlesArray[i].title).replace(/\s/g, '').toLowerCase();
      let convertedEventTitle = (this.suggestedEvent.title).replace(/\s/g, '').toLowerCase();

      //Re-declare the "suggestedEvent.startDate" and "suggestedEvent.endDate" to be just the date, not removing the time portion
      let convertedStartDateFromArray = this.suggestedEvent.startDate.split("T", 1).pop();

      //If the title they are typing is matches any given title in the suggestedEvents array...
      //And the startDates are the same 
      //Meaning they cannot have an suggestedEvent with the same title as another suggestedEvent on that day
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
    let proposedStartTime = this.suggestedEvent.startDate.split("T").pop()
    
    //For now we are not dealing with the timezone offset
      //Which is currently appending itself to the dateTime as "00Z"
        //For now we will just cut that off
    proposedStartTime = this.suggestedEvent.startTime.substring(0, this.suggestedEvent.startTime.length - 4);
    
    //The view is bound to the suggestedEvent.startDate, which by default holds both the date and time
      //If we split the date off, the view will not be bound to a date / time... only a date so the time will now show
        //Create a temp variable to use for comparison to avoid modifying the view
    let startDate = this.suggestedEvent.startDate.split("T", 1).pop();

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

validateInput(suggestedEventID) {
  //If the titles are not the same
    //&& the submit form has been modified by the user
      //&& the submission form returns valid
  if (!this.checkTitle() && this.modifySuggestedEventSubmission.dirty && this.modifySuggestedEventSubmission.status == "VALID") {
    //Save the data
    this.updateSuggestedEvent(suggestedEventID)
  } else {
    var message;
    
    //Check Title / Location Length (we already have custom css to show if the title is the same as another)
    if (this.suggestedEvent.title.length > 30 || this.suggestedEvent.location.length > 30) {
      message = "Your title and location must not be more than 30 characters."
    }

    if (this.suggestedEvent.title.length == 0 || this.suggestedEvent.location.length == 0 ||
        this.suggestedEvent.notes.length == 0 || this.suggestedEvent.category.length == 0 || 
        this.suggestedEvent.startDate.length == 0 || this.suggestedEvent.endDate.length == 0 ||
        this.suggestedEvent.contactName.length ==0 || this.suggestedEvent.contactEmail.length == 0 || 
        this.suggestedEvent.contactPhone.length == 0) {
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
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
//#endregion


//#region UpdateSuggestedEvent
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
  //#endregion
}

