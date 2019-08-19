import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-county-information',
  templateUrl: 'county-information.html',
})
export class CountyInformationPage {

  //Class variable for which information group to display in the dropdown of its card
  informationSelection: any;
  //Clas variable to select which card within any given group to display
  cardSelection: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) { //Set the value of the class variable "event" to the event passed 
   //Pull the value of "districtSelection" from the navigation parameter being sent from the navigation bar
    this.informationSelection = this.navParams.get('informationSelection')
  }


  ionViewDidEnter() {
    //console.log(this.informationSelection)
  }

  
  //Toggle Image Display For Cards
  toggleDisplay(display) {
    this.cardSelection=display
  }

}
