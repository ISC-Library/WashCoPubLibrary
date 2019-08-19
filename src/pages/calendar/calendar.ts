// #region Imports List
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, Platform, Loading, ItemSliding, Item } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { getLocaleDateTimeFormat, getLocaleDateFormat } from '@angular/common';
import { HammerGestureConfig } from "@angular/platform-browser";

//Import Pages
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';
import { ModifyEventsPage } from '../modify-events/modify-events'
import { AddSuggestedEventsPage } from '../add-suggested-events/add-suggested-events'
import { ViewSuggestedEventsPage } from '../view-suggested-events/view-suggested-events'

//Import Provider
import { CalenderEventsServiceProvider } from '../../providers/calendar-event-service/calendar-event-service';
import { AdminAuthProvider } from '../../providers/admin-auth/admin-auth';

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
// #endregion


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'

})
export class CalendarPage {

  //Declare Date variables 
  date: any;
  selectedDay: any;

  //Class variable to hold the values gathered from the service 
  events: Observable<any[]>;

  //Declare formatted dates (array)
  //holds formatted dates {year, month, date} abstracted from the "startDate" of the "allEvents" (array)
  formattedForCSS: any;

  //Create the eventsRef variable: give it the type of "AngularFireList" 
  eventsRef: AngularFireList<any>;

  //Declare the database filter variable
  //Dynamic: Can change so that dynamic filters can be passed to the database 
  databaseFilterDynamic: BehaviorSubject<string | null> = new BehaviorSubject('');
  //Static: Stays as default ('') so that the 
  //Used for the "eventsForCSS" Observable so that it will hold all events (unfiltered), which is default
  databaseFilterStatic: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    public CalendarEventSvc: CalenderEventsServiceProvider,
    public loadingCtrl: LoadingController,
    public AdminAuthProvider: AdminAuthProvider,
    afDatabase:AngularFireDatabase) {

    //This.formattedForCSS needs to be converted to any array 
    this.formattedForCSS = [];

    //Set the value of the class variable "event" to the event passed 
    this.formattedForCSS = this.navParams.get('formattedForCSS');

    //This is the reference to which portion of the database you want to access 
    this.eventsRef = afDatabase.list('events');

    //Set the "events" Observable equal to a call to the database unfiltered by default (all events)
    //Use the "databaseFilterDynamic" to allow it to retrieve data dynamically
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilterDynamic);
  }




  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Below are navigation functions  [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]

  // Navigate to the "HomePage" using the NavController 
  navigateToHomePage(slidingItem: ItemSliding) {
    this.navCtrl.setRoot(HomePage);
  }

  //Function to navigate to the "SuggestEventsPage"
  navigateToAddEventsPage(slidingItem: ItemSliding) {
    slidingItem.close();
    // this.navCtrl.popTo(AddEventPage)
    this.navCtrl.setRoot(AddEventPage);
  }

  //Function to navigate to the "SuggestEventsPage"
  navigateToAddSuggestEventsPage(slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.setRoot(AddSuggestedEventsPage);
  }

  //Function to navigate to the "SuggestEventsPage"
  navigateToViewSuggestEventsPage(slidingItem: ItemSliding) {
    slidingItem.close()
    this.navCtrl.setRoot(ViewSuggestedEventsPage);
  }

  onDragBoolean: boolean;
  percent: any;
  // [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
  // [][][][][][][][][][][][][][] Suggest Event and Admin Sliders[][][][][][][][][][][][][][][][][][]
  // [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]

  //Contains styling for 'glass' Suggest Event sliders
  //#region Suggest event slider
  //The percentage shown is relative to the size of the button that becomes visible
  suggestEventDrag(item, slidingItem: ItemSliding) {
    this.percent = item.getSlidingPercent();

    //[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
    //Everything here changes the CSS of the slider to give an increasing fade feature
    //[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]

    if (this.percent < -.0000001) {
      document.getElementById("suggestedEventOrigin").className = "sliderSuggest01 item item-block item-md"
    }

    if (this.percent < -.05) {
      document.getElementById("suggestedEventOrigin").className = "sliderSuggest05 item item-block item-md"
    }

    if (this.percent < -.10) {
      document.getElementById("suggestedEventOrigin").className = "sliderSuggest10 item item-block item-md"
    }

    if (this.percent < -.15) {
      document.getElementById("suggestedEventOrigin").className = "sliderSuggest15 item item-block item-md"
    }

    if (this.percent < -.20) {
      document.getElementById("suggestedEventOrigin").className = "sliderSuggest20 item item-block item-md"
    }
  }

  //When the user does not drag the slider far enough to go over 50% of the button, it resets to it's original position

  // document.getElementById("suggestedEventOrigin").className = "sliderOrigin item item-block item-md";

  //#endregion

  //Contains styling for 'glass' Admin sliders
  //#region Admin Slider
  adminEventDrag(item, slidingItem: ItemSliding) {
    this.percent = item.getSlidingPercent();

    if (this.percent > .01) {
      document.getElementById("adminEventOrigin").className = "sliderAdminBlue01 item item-block item-md"
      document.getElementById("adminSlider").style.backgroundColor = "rgba(0, 68, 136, 1)"
    }
    if (this.percent > .05) {
      document.getElementById("adminEventOrigin").className = "sliderAdminBlue05 item item-block item-md"
    }
    if (this.percent > .10) {
      document.getElementById("adminEventOrigin").className = "sliderAdminBlue10 item item-block item-md"
    }
    if (this.percent > .15) {
      document.getElementById("adminEventOrigin").className = "sliderAdminBlue15 item item-block item-md"
    }
    if (this.percent > .20) {
      document.getElementById("adminEventOrigin").className = "sliderAdminBlue20 item item-block item-md"
    }
    if (this.percent < -.01) {
      document.getElementById("adminEventOrigin").className = "sliderAdminGreen01 item item-block item-md"
      document.getElementById("adminSlider").style.backgroundColor = "rgba(0,136,68,1)"
    }
    if (this.percent < -.05) {
      document.getElementById("adminEventOrigin").className = "sliderAdminGreen05 item item-block item-md"
    }
    if (this.percent < -.10) {
      document.getElementById("adminEventOrigin").className = "sliderAdminGreen10 item item-block item-md"
    }
    if (this.percent < -.15) {
      document.getElementById("adminEventOrigin").className = "sliderAdminGreen15 item item-block item-md"
    }
    if (this.percent < -.20) {
      document.getElementById("adminEventOrigin").className = "sliderAdminGreen20 item item-block item-md"
    }
  }

  public progress: number = 0;
  public pressState: string = "released";

  // Interval function
  protected interval: any;

  onPress($event) {
    this.pressState = 'pressing';
    this.startInterval();
  }

  onPressUp($event) {
    this.pressState = 'released';
    this.stopInterval();
  }

  startInterval() {
    const self = this;
    this.interval = setInterval(function () {
      self.progress = self.progress + 1;
    }, 50);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  onAdminDragFalse($event) {
    this.pressState = 'released';
    this.stopInterval();
    if ($event) {
      document.getElementById("adminEventOrigin").className = "sliderOrigin item item-block item-md"
    }
  }

  onSuggestDragFalse($event) {
    this.pressState = 'released', $event;
    this.stopInterval();
    if ($event) {
      document.getElementById("suggestedEventOrigin").className = "sliderOrigin item item-block item-md"
    }
  }
  //#endregion


  //Contains styling for 'glass' Modify Slider. Needs to finish/test more
  // #region ModifyButtonFader
  //[][][][][][][][][][][][][]Possible future to change Populated List of Items Fade[][][][][][][][][][][][][][]
  // adminModifyDrag(item, slidingItem: ItemSliding) {
  //   this.percent = item.getSlidingPercent();

  //   if (this.percent < -.0000001) {
  //     document.getElementById("adminModifySlide").className = "sliderAdminModify01 item item-block item-md"
  //   }

  //   if (this.percent < -.05) {
  //     document.getElementById("adminModifySlide").className = "sliderAdminModify05 item item-block item-md"
  //   }

  //   if (this.percent < -.10) {
  //     document.getElementById("adminModifySlide").className = "sliderAdminModify10 item item-block item-md"
  //   }

  //   if (this.percent < -.15) {
  //     document.getElementById("adminModifySlide").className = "sliderAdminModify15 item item-block item-md"
  //   }

  //   if (this.percent < -.20) {
  //     document.getElementById("adminModifySlide").className = "sliderAdminModify20 item item-block item-md"
  //   }
  // }


  // adminModifyDragFalse(){
  //   // document.getElementById("adminModifySlide").className="sliderOrigin item item-block item-md"
  // }
  //[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
  // #endregion


  // [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
  // [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]





  //#region GatherChildren event to collect the <spans> that contain an event.
  gatherChildren($event) {
    let elementsOne = document.getElementsByClassName("center calendar-col col this-month");

    //Cuts the month from the month shown, gives it a value coresponding to the index of months
    let month = document.getElementById("displayMonthDiv").innerText.split("- ").pop();

    //Sport to hold Sport Events
    let sportingArray = []

    //Community to hold Community Events
    let communityArray = [];

    //Business to hold Business Events
    let businessArray = [];

    //ArtArray to hold Art Events
    let artArray = [];

    if (month == "January") {
      month = "0"
    } else if (month == "February") {
      month = "1"
    } else if (month == "March") {
      month = "2"
    } else if (month == "April") {
      month = "3"
    } else if (month == "May") {
      month = "4"
    } else if (month == "June") {
      month = "5"
    } else if (month == "July") {
      month = "6"
    } else if (month == "August") {
      month = "7"
    } else if (month == "Septemeber") {
      month = "8"
    } else if (month == "October") {
      month = "9"
    } else if (month == "November") {
      month = "10"
    } else if (month == "December") {
      month = "11"
    }


    let counter = 0;

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    if ($event.value == "all") {
      let elementsAll = []

      //Get all elements
      for (let i = 0; i < elementsOne.length; i++) {
        if (elementsOne[i].textContent.trim() !== "") {
          elementsAll.push(elementsOne[i].getElementsByTagName("span"));
          elementsAll = elementsAll.filter(value => Object.keys(value).length !== 0)
        }
      }

      //Show all event blips
      for (let i = (elementsAll.length - 1); i > -1; i--) {
        if (elementsAll[i][0].className == "eventBlipHidden") {
          elementsAll[i][0].className = "eventBlip"
        }
      }

      //Show all sports blips
      for (let i = (elementsAll.length - 1); i > -1; i--) {
        if (elementsAll[i][0].className == "sportingBlipHidden") {
          elementsAll[i][0].className = "sportingBlip"
        }
      }

      //Show all community blips
      for (let i = (elementsAll.length - 1); i > -1; i--) {
        if (elementsAll[i][0].className == "communityBlipHidden") {
          elementsAll[i][0].className = "communityBlip"
        }
      }

      //Show all business blips
      for (let i = (elementsAll.length - 1); i > -1; i--) {
        if (elementsAll[i][0].className == "businessBlipHidden") {
          elementsAll[i][0].className = "businessBlip"
        }
      }

      //Show all art blips
      for (let i = (elementsAll.length - 1); i > -1; i--) {
        if (elementsAll[i][0].className == "artBlipHidden") {
          elementsAll[i][0].className = "artBlip"
        }
      }
    }





    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    if ($event.value == "sporting") {
      let elementsSports = [];
      let elementsNotSports = [];
      //Generate Sporting Element Array
      for (let i = 0; i < this.formattedForCSS.length; i++) {
        if (this.formattedForCSS[i].category == "sporting" && this.formattedForCSS[i].month == month)
          sportingArray.push(this.formattedForCSS[i].date)
      }

      //Get all elements that do not contain an sporting event
      for (let i = 0; i < elementsOne.length; i++) {
        for (let j = 0; j < sportingArray.length; j++) {
          if (elementsOne[i].textContent.trim() == sportingArray[j]) {
            elementsSports.push(elementsOne[i].getElementsByTagName("span"));
            elementsSports = elementsSports.filter(value => Object.keys(value).length !== 0)
            counter = 0;
          } else {
            if (counter == sportingArray.length) {
              elementsNotSports.push(elementsOne[i].getElementsByTagName("span"));
              elementsNotSports = elementsNotSports.filter(value => Object.keys(value).length !== 0)
              counter = 0
            }
            counter++
          }
        }
      }



      //#region Loop Logic
      //****** Explanation:: for loop logic 
      //First: the lengths are calculated dynamically, so each time we change the class of an element in the collection...
      //...the length of the collection is reduced by 1.
      //So if we attempt to iterate starting at 0 while "i" < length... it will never make it to the end of the array
      //This is because "i" increments by 1 while the length decrements by 1, so at some point 2 elements get skipped

      //Second: The "length" of any of the given HTML collections is a count, meaning it starts at 1 not 0
      //However the HTML collection indices start at 0, much like any other array type object
      //So we let the iterating variable "i" = the length of a given collection - 1, to account for these principles

      //Finally: We will actually decrement "i" starting with the original length of the HTML collection
      //This allows "i" to start at high end of the index and count down so nothing is missed
      //We know all arrays begin indexing at "0" so once "i" is at a point where only -1 is below it, we stop
      //#endregion

      //Show all sporting blips
      for (let i = (elementsSports.length - 1); i > -1; i--) {
        if (elementsSports[i][0].className == "sportingBlipHidden") {
          elementsSports[i][0].className = "sportingBlip"
        }
      }

      //Show all event blips
      for (let i = (elementsSports.length - 1); i > -1; i--) {
        if (elementsSports[i][0].className == "eventBlipHidden") {
          elementsSports[i][0].className = "eventBlip"
        }
      }

      //Hide nonsporting event blips
      for (let i = (elementsNotSports.length - 1); i > -1; i--) {
        if (elementsNotSports[i][0].className == "eventBlip") {
          elementsNotSports[i][0].className = "eventBlipHidden"
        }
      }

      //Hide all art blips
      for (let i = (elementsNotSports.length - 1); i > -1; i--) {
        if (elementsNotSports[i][0].className == "artBlip") {
          elementsNotSports[i][0].className = "artBlipHidden"
        }
      }

      //Hide all community blips
      for (let i = (elementsNotSports.length - 1); i > -1; i--) {
        if (elementsNotSports[i][0].className == "communityBlip") {
          elementsNotSports[i][0].className = "communityBlipHidden"
        }
      }

      //Hide all business blips
      for (let i = (elementsNotSports.length - 1); i > -1; i--) {
        if (elementsNotSports[i][0].className == "businessBlip") {
          elementsNotSports[i][0].className = "businessBlipHidden"
        }
      }
    }

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    if ($event.value == "community") {
      let elementsCommunity = []
      let elementsNotCommunity = []

      //Generate Community Element Array
      for (let i = 0; i < this.formattedForCSS.length; i++) {
        if (this.formattedForCSS[i].category == "community" && this.formattedForCSS[i].month == month)
          communityArray.push(this.formattedForCSS[i].date)
      }

      //Get all elements that do not contain an community event
      for (let i = 0; i < elementsOne.length; i++) {
        for (let j = 0; j < communityArray.length; j++) {
          if (elementsOne[i].textContent.trim() == communityArray[j]) {
            elementsCommunity.push(elementsOne[i].getElementsByTagName("span"));
            elementsCommunity = elementsCommunity.filter(value => Object.keys(value).length !== 0)
            counter = 0;
          } else {
            if (counter == communityArray.length) {
              elementsNotCommunity.push(elementsOne[i].getElementsByTagName("span"));
              elementsNotCommunity = elementsNotCommunity.filter(value => Object.keys(value).length !== 0)
              counter = 0
            }
            counter++
          }
        }
      }

      //Show all community blips
      for (let i = (elementsCommunity.length - 1); i > -1; i--) {
        if (elementsCommunity[i][0].className == "communityBlipHidden") {
          elementsCommunity[i][0].className = "communityBlip"
        }
      }

      //Show all event blips
      for (let i = (elementsCommunity.length - 1); i > -1; i--) {
        if (elementsCommunity[i][0].className == "eventBlipHidden") {
          elementsCommunity[i][0].className = "eventBlip"
        }
      }

      //Hide noncommunity event blips
      for (let i = (elementsNotCommunity.length - 1); i > -1; i--) {
        if (elementsNotCommunity[i][0].className == "eventBlip") {
          elementsNotCommunity[i][0].className = "eventBlipHidden"
        }
      }

      //Hide all sports blips
      for (let i = (elementsNotCommunity.length - 1); i > -1; i--) {
        if (elementsNotCommunity[i][0].className == "sportingBlip") {
          elementsNotCommunity[i][0].className = "sportingBlipHidden"
        }
      }

      //Hide all art blips
      for (let i = (elementsNotCommunity.length - 1); i > -1; i--) {
        if (elementsNotCommunity[i][0].className == "artBlip") {
          elementsNotCommunity[i][0].className = "artBlipHidden"
        }
      }

      //Hide all business blips
      for (let i = (elementsNotCommunity.length - 1); i > -1; i--) {
        if (elementsNotCommunity[i][0].className == "businessBlip") {
          elementsNotCommunity[i][0].className = "businessBlipHidden"
        }
      }
    }

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    if ($event.value == "business") {
      let elementsBusiness = []
      let elementsNotBusiness = []

      //Generate Business Element Array
      for (let i = 0; i < this.formattedForCSS.length; i++) {
        if (this.formattedForCSS[i].category == "business" && this.formattedForCSS[i].month == month)
          businessArray.push(this.formattedForCSS[i].date)
      }

      //Get all elements that do not contain an business event
      for (let i = 0; i < elementsOne.length; i++) {
        for (let j = 0; j < businessArray.length; j++) {
          if (elementsOne[i].textContent.trim() == businessArray[j]) {
            elementsBusiness.push(elementsOne[i].getElementsByTagName("span"));
            elementsBusiness = elementsBusiness.filter(value => Object.keys(value).length !== 0)
            counter = 0;
          } else {
            if (counter == businessArray.length) {
              elementsNotBusiness.push(elementsOne[i].getElementsByTagName("span"));
              elementsNotBusiness = elementsNotBusiness.filter(value => Object.keys(value).length !== 0)
              counter = 0
            }
            counter++
          }
        }
      }

      //Show all business blips
      for (let i = (elementsBusiness.length - 1); i > -1; i--) {
        if (elementsBusiness[i][0].className == "businessBlipHidden") {
          elementsBusiness[i][0].className = "businessBlip"
        }
      }

      //Show all event blips
      for (let i = (elementsBusiness.length - 1); i > -1; i--) {
        if (elementsBusiness[i][0].className == "eventBlipHidden") {
          elementsBusiness[i][0].className = "eventBlip"
        }
      }

      //Hide nonbusiness event blips
      for (let i = (elementsNotBusiness.length - 1); i > -1; i--) {
        if (elementsNotBusiness[i][0].className == "eventBlip") {
          elementsNotBusiness[i][0].className = "eventBlipHidden"
        }
      }

      //Hide all sports blips
      for (let i = (elementsNotBusiness.length - 1); i > -1; i--) {
        if (elementsNotBusiness[i][0].className == "sportingBlip") {
          elementsNotBusiness[i][0].className = "sportingBlipHidden"
        }
      }

      //Hide all art blips
      for (let i = (elementsNotBusiness.length - 1); i > -1; i--) {
        if (elementsNotBusiness[i][0].className == "artBlip") {
          elementsNotBusiness[i][0].className = "artBlipHidden"
        }
      }

      //Hide all community blips
      for (let i = (elementsNotBusiness.length - 1); i > -1; i--) {
        if (elementsNotBusiness[i][0].className == "communityBlip") {
          elementsNotBusiness[i][0].className = "communityBlipHidden"
        }
      }
    }

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    if ($event.value == "art") {
      let elementsArt = []
      let elementsNotArt = []

      //Generate Art Element Array
      for (let i = 0; i < this.formattedForCSS.length; i++) {
        if (this.formattedForCSS[i].category == "art" && this.formattedForCSS[i].month == month)
          artArray.push(this.formattedForCSS[i].date)
      }

      //Get all elements that do not contain an art event
      for (let i = 0; i < elementsOne.length; i++) {
        for (let j = 0; j < artArray.length; j++) {
          if (elementsOne[i].textContent.trim() == artArray[j]) {
            elementsArt.push(elementsOne[i].getElementsByTagName("span"));
            elementsArt = elementsArt.filter(value => Object.keys(value).length !== 0)
            counter = 0;
          } else {
            if (counter == artArray.length) {
              elementsNotArt.push(elementsOne[i].getElementsByTagName("span"));
              elementsNotArt = elementsNotArt.filter(value => Object.keys(value).length !== 0)
              counter = 0
            }
            counter++
          }
        }
      }

      //Show all art blips
      for (let i = (elementsArt.length - 1); i > -1; i--) {
        if (elementsArt[i][0].className == "artBlipHidden") {
          elementsArt[i][0].className = "artBlip"
        }
      }

      //Show all event blips
      for (let i = (elementsArt.length - 1); i > -1; i--) {
        if (elementsArt[i][0].className == "eventBlipHidden") {
          elementsArt[i][0].className = "eventBlip"
        }
      }

      //Hide nonart event blips
      for (let i = (elementsNotArt.length - 1); i > -1; i--) {
        if (elementsNotArt[i][0].className == "eventBlip") {
          elementsNotArt[i][0].className = "eventBlipHidden"
        }
      }

      //Hide all sports blips
      for (let i = (elementsNotArt.length - 1); i > -1; i--) {
        if (elementsNotArt[i][0].className == "sportingBlip") {
          elementsNotArt[i][0].className = "sportingBlipHidden"
        }
      }

      //Hide all community blips
      for (let i = (elementsNotArt.length - 1); i > -1; i--) {
        if (elementsNotArt[i][0].className == "communityBlip") {
          elementsNotArt[i][0].className = "communityBlipHidden"
        }
      }

      //Hide all  business blips
      for (let i = (elementsNotArt.length - 1); i > -1; i--) {
        if (elementsNotArt[i][0].className == "businessBlip") {
          elementsNotArt[i][0].className = "businessBlipHidden"
        }
      }
    }
  }
//#endregion

  // Navigate to the "ModifyEvent" page
  //The user selects modify button on the event which they wish to modify 
  //The event data for that specific event is passed, which we will forward to the "ModifyEvent" page
  modifyEvent(event) {
    console.log(event)
    this.navCtrl.push(ModifyEventsPage, {
      event
    });
  }

  deleteEvent(event) {
    console.log("Delete");
    //Call the database via the "suggestedEventsRef" and delete the item corresponding to the suggestedEvent.id passed
    this.eventsRef.remove(event.id);
  };

  // [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]
  //////// Below this are the portions to display event data  [][[][[][][][][][][][[][][]]]]
  // [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]


  ionViewDidLoad() {
  };

  ionViewWillEnter() {
    this.presentLoadingDefault()
    this.isAdmin()
  }

  //If the view had been entered
  ionViewDidEnter() {
    
  }



  isAdmin() {
    if (this.AdminAuthProvider.isLoggedIn()) {
      //console.log(this.AdminAuthProvider.currentUser)

      if (this.AdminAuthProvider.currentUser.role === 0) {
        //console.log("true")
        return true;
      } else {
        //console.log("false")
        return false;
      }
    } 
  }

  //Loading Spinner
  //The portion to load the events for today's date are in here...
  //This prevents them from attempting to load before the event spinner is invoked
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Calendar is loading...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

    // Set the value of class variable "this.date" to a new date() , which is the current date
    this.date = new Date();

    //For full explanation of if structure: See "onDaySelect()" subproceedure
    let appendedDate: string;
    let appendedMonth: string;

    //Both
    if ((String(this.date.getMonth() + 1).length < 2) && (String(this.date.getDate()).length < 2)) {
      //Save each change as an "appeneded" version
      appendedMonth = ("0" + (this.date.getMonth() + 1));
      appendedDate = ("0" + this.date.getDate());
      //Format the date gathered from the event into a string that can be compared to firebase 
      //Set the "dataBaseFilter" according to the newly values, in the specified format
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + appendedMonth + "-" + appendedDate);
    } else if (String(this.date.getMonth() + 1).length < 2) {
      //Month
      //For some reason we have to add a 1, because the months are always behind
      appendedMonth = ("0" + (this.date.getMonth() + 1));
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + appendedMonth + "-" + this.date.getDate());
    } else if (String(this.date.getDate()).length < 2) {
      //Day ... "date"
      appendedDate = ("0" + this.date.getDate());
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + appendedDate);
    } else {
      //If both the day and the month had double digit values
      //Do not modify the values 
      this.databaseFilterDynamic.next(this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate());
    }

    this.CalendarEventSvc.getEvents(this.databaseFilterDynamic);


    //Values to get the timezone offset if necessary
    //var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    //var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);


    //[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
  };



  //Get the selected day 
  onDaySelect($event) {
    //Firebase has dates stored with leading zeros for months and days 
    //This causes the database provider not to be able to filter correctly unless a leading 0 is added to days with a single digit

    //Process::
    //The ($event) is not passed as a string so we must convert it before we take its "length" property
    //Then measure the length, if it is 1 this  means we are dealing with a single digit number
    //If so, append "0" to the beginning of the single digit portion
    let appendedEventDate: string;
    let appendedEventMonth: string;

    //Both
    if ((String($event.month + 1).length < 2) && (String($event.date).length < 2)) {
      //Save each change as an "appeneded" version
      appendedEventMonth = ("0" + ($event.month + 1));
      appendedEventDate = ("0" + $event.date);
      //Format the date gathered from the event into a string that can be compared to firebase 
      //Set the "selectedDay" according to the newly values, in the specified format
      this.selectedDay = ($event.year + "-" + appendedEventMonth + "-" + appendedEventDate);
    } else if (String($event.month + 1).length < 2) {
      //Month
      //For some reason we have to add a 1, because the months are always behind
      appendedEventMonth = ("0" + ($event.month + 1));
      this.selectedDay = ($event.year + "-" + appendedEventMonth + "-" + $event.date);
    } else if (String($event.date).length < 2) {
      //Day ... "date"
      appendedEventDate = ("0" + $event.date);
      this.selectedDay = ($event.year + "-" + ($event.month + 1) + "-" + appendedEventDate);
    } else {
      //If both the day and the month had double digit values
      //Do not modify the values 
      this.selectedDay = ($event.year + "-" + ($event.month + 1) + "-" + $event.date);
    }

    //Set the database filter to the "selectedDay"
    this.databaseFilterDynamic.next(this.selectedDay);

    //Call the database filtered by the selected day
    this.events = this.CalendarEventSvc.getEvents(this.databaseFilterDynamic);

    //console.log(this.events)
  }


  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]
  //////// Everything below this is interaction with the native events on the phone [][[][[][][][][][][][[][][]]]]
  // []][][][][]][][][][][][][[]][][][][][][][][]]][][][][][][][][][][][][][][][][]]][][][]][][][][][]][]]][][]][]

  //Open Native Calendar 
  openCalendar() {
    this.calendar.openCalendar(new Date()).then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    )
  }

  //Add an event to your native calendar 
  addNativeEvent() {
    return this.calendar.createEventInteractively("event title");
  }

  //Native event scheduler 
  scheduleEvents() {
    this.calendar.hasReadWritePermission().then((result) => {
      if (result === false) {
        this.calendar.requestReadWritePermission().then((v) => {
          this.addNativeEvent();
        }, (r) => {
          console.log("Rejected");
        })
      }
      else {
        this.addNativeEvent();
      }
    })

  }



}

