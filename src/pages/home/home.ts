import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // We can set the dynamic variable from the home.html here ...
  myHomeText: any = "this is the home page";

  //Variable we are going to use in our two way data binding 
  username: any;

  constructor(public navCtrl: NavController) {

  }

  //Log out the data from the $event passing through the function 
  doSomething(ev){
    console.log(ev);
  }

  submitUser(){
    console.log(this.username)
  }
}
