import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Component } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Calendar} from '@ionic-native/calendar';

import { MyApp } from './app.component';

//Import Pages
import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { CalendarPage } from '../pages/calendar/calendar';
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';

//Import Custom Component 
import { ComponentsModule } from '../components/components.module';

//Import Providers 
import { TestProvider } from '../providers/test/test';

// Import the AF2 Module
//Note, module has been updated... all angularfire2 references are now at '@angular/fire'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

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
    AdminPage,
    LoginPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    AngularFireDatabaseModule,
    Calendar
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    CalendarPage,
    AdminPage,
    LoginPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TestProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Calendar

  ]
})
export class AppModule { }

