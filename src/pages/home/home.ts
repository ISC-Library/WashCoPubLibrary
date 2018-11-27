import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Import any other pages you need to reference
import { TestPage } from '../test/test';
import { AboutPage } from '../about/about';
import { CalendarPage } from '../calendar/calendar';

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';
import { JobLinksPage } from '../joblinks/joblinks';

 @Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Class variable to hold the values gathered from the service
    //There must be a variable that holds all of the events, (non-filtered)
      //This is so that we can populate the CSS for any day with an event
        //The other "events" Observable changes according to current Date, or user's selecting a day, etc.
        eventsForCSS: Observable<any[]>;
  
  //Declare list (array) to hold all events, used to pass event dates to calendar for CSS purposes (THE DOTS!)
  allEvents: any;
  
  //Declare formatted dates (array)
    //holds formatted dates {year, month, date} abstracted from the "startDate" of the "allEvents" (array)
    formattedForCSS: any;
    categoryArray: any;

  //Static: Stays as default ('') so that the 
    //Used for the "eventsForCSS" Observable so that it will hold all events (unfiltered), which is default
  databaseFilterStatic: BehaviorSubject<string | null> = new BehaviorSubject('');


  constructor(public navCtrl: NavController,
    public CalendarEventSvc: CalenderEventsServiceProvider,) {

    //This.allEvents needs to be converted to any array 
    this.allEvents = [];
    //This.formattedForCSS needs to be converted to any array 
    this.formattedForCSS = [];
    this.categoryArray = [];

    //Set the "eventsForCSS" Observable equal to a call to the database unfiltered (all events)
      //Use the "databaseFilterStatic" to allow it to retrieve the default / unfiltered set (all events)
      this.eventsForCSS = this.CalendarEventSvc.getEvents(this.databaseFilterStatic);

      //We must .subscribe to the "eventsForCSS" Observable before attempting to do anything with its values
      //This is because the code is being run asynchronously... meaning the line of code may not complete directly after it is called
        //.Subscribe will let us know when the code is finished executing, by not allowing its inner portion to execute until then
          //This allows us to only attempt to access "eventsForCSS" data once it has "promised" us that the data is now there  
    this.eventsForCSS.subscribe((data) => {
      //Set the .subscription "data" values that are returned to the array "allEvents[]"
      this.allEvents = data;
      //console.log(this.allEvents)
      //Once we know that "allEvents[]" has data, reformat the values 
      this.reformatAllEventsArray();
    });
    
  }

  //Function to navigate to the "TestPage" using the NavController 
  // navigateToTestPage(){
  //   this.navCtrl.push(TestPage);
  // }


  goToCalendar() {
    //this.navCtrl.push(CalendarPage);
    this.navCtrl.push(CalendarPage, {
      formattedForCSS: this.formattedForCSS
    });
  }

  goToHelp() {
    this.navCtrl.push(AboutPage);
  }

  goToJobLinks(){
    this.navCtrl.push(JobLinksPage)
  }

  goToBookShelf(){
    window.open("https://abdodigital.com/?tk=A8A412886D6FFCA174EA2F2E90A6169D", '_system', 'location=yes');
  }


  reformatAllEventsArray(){
    //For Loop Syntax:
      //Let "iteration variable" = initialized value;
      //While "condition";
      //Increment "iteration variable"
    for (let i = 0; i < this.allEvents.length; i++) {
      //console.log(this.allEvents)
      //console.log(this.allEvents[i].startDate);
      //console.log(this.allEvents[i].startDate.split("-"))
      

      //The "string.split" function creates an array for each value split via the delimiter
        //We will store those values in a temporary array
      let tempArray = this.allEvents[i].startDate.split("-");
      //TempArray: [0] = year, [1] = month, [2] = date
        //Set each property of the object respective to the portion of the "tempArray" it should hold

      //The month is always  -1 from what it should be, so add the value back to it 
      let appendedMonth = parseInt(tempArray[1]);
      appendedMonth = (appendedMonth -1)

      
      this.formattedForCSS[i] = {
        year:parseInt(tempArray[0]), 
        month:appendedMonth, 
        date:parseInt(tempArray[2]),
        category: this.allEvents[i].category
      };
     
      //Use the ".push" method of array data types on the "formattedForCSS" array...
        //To push the formatted "dateObject" into the array, at the current index of
      // this.formattedForCSS.push({dateObject})
      // console.log(this.formattedForCSS);
    } 

    //return this.formattedForCSS;  
    //this.formatCategoryArray();
    //console.log(this.formattedForCSS)
  }
}


  
