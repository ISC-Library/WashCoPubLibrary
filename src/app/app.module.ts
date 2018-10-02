import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CalendarPage } from '../pages/calendar/calendar';
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CalendarPage,
    AdminPage,
    LoginPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CalendarPage,
    AdminPage,
    LoginPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }

//Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';


// Initialize Firebase // AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBHFzkJ5JJORLY5c3oOlLBI3WTQQ__qDKA",
  authDomain: "washcolibrary-b1f71.firebaseapp.com",
  databaseURL: "https://washcolibrary-b1f71.firebaseio.com",
  projectId: "washcolibrary-b1f71",
  storageBucket: "washcolibrary-b1f71.appspot.com",
  messagingSenderId: "62541126789"
};


