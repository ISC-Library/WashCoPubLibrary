import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // We can set the dynamic variable from the home.html here ...
  myHomeText: any = "this is the home page";

  constructor(public navCtrl: NavController) {

  }

  //Log out the data from the $event passing through the function 
  doSomething(ev){
    console.log(ev);
  }
}
