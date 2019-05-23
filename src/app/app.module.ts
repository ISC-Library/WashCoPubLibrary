import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Component } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
// import { Directive} from 'ionic3-input-mask';

//Import Pages
import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { CalendarPage } from '../pages/calendar/calendar';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { AddEventPage} from '../pages/add-event/add-event';
import { ViewSuggestedEventsPage } from '../pages/view-suggested-events/view-suggested-events';
import { AddSuggestedEventsPage } from '../pages/add-suggested-events/add-suggested-events';
import { ModifyEventsPage } from '../pages/modify-events/modify-events';
import { ModifySuggestedEventsPage } from '../pages/modify-suggested-events/modify-suggested-events';
import { JobLinksPage} from '../pages/joblinks/joblinks';
import { NoneExistPage } from '../pages/none-exist/none-exist';
import { CommissionPage } from '../pages/commission/commission';
import { SchoolDistrictsPage } from '../pages/school-districts/school-districts'
import { LocalGovernmentAndServicesPage } from '../pages/local-government-and-services/local-government-and-services'

//Import Loooooooooonnnggg Press
import {LongPressModule} from 'ionic-long-press';

//Import Gesture Stuff from tutorial 
// import {RouteReuseStrategy} from '@angular/';
// import { IonicRouteStrategy } from '@ionic/angular';
// import {IonicGestureConfig} from "./gestures/ionic-gesture-config";
// import {AppRoutingModule} from './app-routing.module';

//Import Calendar
import { Calendar } from '@ionic-native/calendar'; //This is the native cordova portion that allows interaction with the devices 
import { CalendarModule } from 'ionic3-calendar-en'; //This is the ionic3 calendar which has a view 

//Import Custom Component 
import { ComponentsModule } from '../components/components.module';

//Import Providers 
import { TestProvider } from '../providers/test/test';
import { SuggestedEventsServiceProvider } from '../providers/add-suggested-events/add-suggested-events';
import { CalenderEventsServiceProvider } from '../providers/calendar-event-service/calendar-event-service';
import { AdminAuthProvider } from '../providers/admin-auth/admin-auth';
import { IonicGestureConfigProvider } from '../providers/ionic-gesture-config/ionic-gesture-config'
import { EventTitleCheckProvider } from '../providers/event-title-check/event-title-check';
import { CheckUserProvider } from '../providers/check-user/check-user'

// Import the AF Module
//Note, module has been updated... all angularfire2 references are now at '@angular/fire'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Initialize Firebase // AF2 Settings 
export const firebaseConfig = {
  //NoCuts Database key: for testing purposes! 
  // apiKey: "AIzaSyDt_SEzOLkG4b5nD3b773b_7Ob_tz-YHIU",
  // authDomain: "nocuts-firebase-app.firebaseapp.com",
  // databaseURL: "https://nocuts-firebase-app.firebaseio.com",
  // projectId: "nocuts-firebase-app",
  // storageBucket: "nocuts-firebase-app.appspot.com",
  // messagingSenderId: "42871486248"


  //WashCo database key:
  apiKey: "AIzaSyBHFzkJ5JJORLY5c3oOlLBI3WTQQ__qDKA",
  authDomain: "washcolibrary-b1f71.firebaseapp.com",
  databaseURL: "https://washcolibrary-b1f71.firebaseio.com",
  projectId: "washcolibrary-b1f71",
  storageBucket: "washcolibrary-b1f71.appspot.com",
  messagingSenderId: "62541126789"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    CalendarPage,
    LoginPage,
    AboutPage,
    AddEventPage,
    AddSuggestedEventsPage,
    ViewSuggestedEventsPage,
    ModifyEventsPage,
    ModifySuggestedEventsPage,
    JobLinksPage,
    NoneExistPage,
    CommissionPage,
    SchoolDistrictsPage,
    LocalGovernmentAndServicesPage
    // //Delcare the directive for the ionic 3 input mask
    // Directive
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CalendarModule,
    LongPressModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    CalendarPage,
    LoginPage,
    AboutPage,
    AddEventPage,
    AddSuggestedEventsPage,
    ViewSuggestedEventsPage,
    ModifyEventsPage,
    ModifySuggestedEventsPage,
    JobLinksPage,
    NoneExistPage,
    CommissionPage,
    SchoolDistrictsPage,
    LocalGovernmentAndServicesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TestProvider,
    Calendar,
    CalenderEventsServiceProvider,
    SuggestedEventsServiceProvider,
    AdminAuthProvider,
    IonicGestureConfigProvider,
    EventTitleCheckProvider,
    CheckUserProvider
  ]
})
export class AppModule { }
