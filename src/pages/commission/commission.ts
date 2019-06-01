import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-commission',
  templateUrl: 'commission.html',
})

export class CommissionPage {


  
  //Class variable for which district map to display in the dropdown of its card
  districtSelection: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) { //Set the value of the class variable "event" to the event passed 
   //Pull the value of "districtSelection" from the navigation parameter being sent from the navigation bar
    this.districtSelection = this.navParams.get('districtSelection')
  }


  ionViewDidEnter() {

  }

  
  //Toggle Image Display For Cards
  toggleDisplay(display) {
    this.districtSelection=display
  }
}