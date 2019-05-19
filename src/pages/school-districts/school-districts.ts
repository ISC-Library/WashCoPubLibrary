import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-school-districts',
  templateUrl: 'school-districts.html',
})
export class SchoolDistrictsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }


  //Toggle Image Display For Cards
  displayMore(display) {

    //IF structure to show and hide each image for each district respectively 

    if (display == "oneMore") {
      document.getElementById("oneShow").style.display = "none"
      document.getElementById("oneHide").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "twoMore") {
      document.getElementById("twoShow").style.display = "none"
      document.getElementById("twoHide").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "threeMore") {
      document.getElementById("threeShow").style.display = "none"
      document.getElementById("threeHide").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "fourMore") {
      document.getElementById("fourShow").style.display = "none"
      document.getElementById("fourHide").style.display = "block"
      // document.getElementById($suggestedEvent.id + 'list').style.display = "block"
    }

    if (display == "fiveMore") {
      document.getElementById("fiveShow").style.display = "none"
      document.getElementById("fiveHide").style.display = "block"
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
  }
}
