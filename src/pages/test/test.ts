import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Import Pages
import { HomePage } from '../home/home';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  //Variable we are going to use in our two way data binding 
  username: any;

  constructor(public navCtrl: NavController) {

  }

   //Function to navigate to the "HomePage" using the NavController 
   navigateToHomePage(){
    this.navCtrl.push(HomePage);
  }


}
