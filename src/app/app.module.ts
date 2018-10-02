import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Component } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Import Custom Component 
import { ComponentsModule } from '../components/components.module';

// Import the AF2 Module
//Note, module has been updated... all angularfire2 references are now at '@angular/fire'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Initialize Firebase // AF2 Settings 
  var firebaseConfig = {
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
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
