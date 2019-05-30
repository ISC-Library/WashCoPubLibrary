import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commission',
  templateUrl: 'commission.html',
})

export class CommissionPage {


  //Class variable for which district map to display in the dropdown of its card
  districtSelection: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.districtSelection = this.navParams.get('districtSelection')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommissionPage');
  }



  //Toggle Image Display For Cards
  displayMore(display) {

    //IF structure to show and hide each image for each district respectively 

    //The easiest way I can see is to hide all buttons, then display the one you need using the following if structure
    //Highly inefficient, but we have committed to this method at this point
    document.getElementById("oneShow").style.display = "block"
    document.getElementById("oneHide").style.display = "none"
    document.getElementById("twoShow").style.display = "block"
    document.getElementById("twoHide").style.display = "none"
    document.getElementById("threeHide").style.display = "none"
    document.getElementById("threeShow").style.display = "block"
    document.getElementById("fourHide").style.display = "none"
    document.getElementById("fourShow").style.display = "block"
    document.getElementById("fiveHide").style.display = "none"
    document.getElementById("fiveShow").style.display = "block"


    if (display == "oneMore") {
      document.getElementById("oneShow").style.display = "none"
      document.getElementById("oneHide").style.display = "block"
      this.districtSelection = "chatom"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "twoMore") {
      document.getElementById("twoShow").style.display = "none"
      document.getElementById("twoHide").style.display = "block"
      this.districtSelection = "fruitdale"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "threeMore") {
      document.getElementById("threeShow").style.display = "none"
      document.getElementById("threeHide").style.display = "block"
      this.districtSelection = "leroy"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "fourMore") {
      document.getElementById("fourShow").style.display = "none"
      document.getElementById("fourHide").style.display = "block"
      this.districtSelection = "mcintosh"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "fiveMore") {
      document.getElementById("fiveShow").style.display = "none"
      document.getElementById("fiveHide").style.display = "block"
      this.districtSelection = "millry"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

  }

  displayLess(display) {
    if (display == "oneLess") {
      document.getElementById("oneHide").style.display = "none"
      document.getElementById("oneShow").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'hide').style.display = "none"
    }

    if (display == "twoLess") {
      document.getElementById("twoHide").style.display = "none"
      document.getElementById("twoShow").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "threeLess") {
      document.getElementById("threeHide").style.display = "none"
      document.getElementById("threeShow").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "fourLess") {
      document.getElementById("fourHide").style.display = "none"
      document.getElementById("fourShow").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "fiveLess") {
      document.getElementById("fiveHide").style.display = "none"
      document.getElementById("fiveShow").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    //For hiding the map, it does not matter what was selected... all of them should set the selection back to blank
    this.districtSelection = ""
  }
}