import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Import Provider
import { TestProvider } from '../../providers/test/test';


@Component({
  selector: 'test-component',
  templateUrl: 'test.html',
})


export class TestComponent {

  //Supply an Input called 'myText' and assign it to textToUse (textToUse is a variable)
  @Input('myText') textToUse;

  //Supply and Output called 'somethingHappened'
  //This Output is of the same name as the custom event we created on the test.ts (test page that is)
  // you then set this equal to an event emitter, so the component can now detect that event occuring 
  @Output() somethingHappened = new EventEmitter();


  //Class variable to hold the values gathered from the service 
  users: Observable<any[]>;
  
  //Declare the startAt variable, which is the variable the "TestProvider.getUsers" function takes as a parameter 
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
  
  //Inject the Provider into the constructor *****
  constructor(public testSvc: TestProvider) {}



 //Function to interact with the "TestProvider"
  callTestProvider(){
    //Set the class variable "users" = to the value returned by the function
    this.users = this.testSvc.getUsers(this.startAt);
  }

  userDudes(){
    this.users = this.testSvc.getUsers(this.startAt);
    //this.songs = this.songsSvc.getSongs(this.startAt);
  }

   // ngOnChanges(changes: SimpleChanges) {
  //   for (let propertyName in changes) {
  //     let change = changes[propertyName];
  //     let currentValue  = JSON.stringify(change.currentValue);
  //     let previousValue = JSON.stringify(change.previousValue);   
  //   }
  // }

  //ngAfterViewInit is a method that waits for everything to load before it executes 
  // ngAfterViewInit(){
  //   //Set this.text to 'textToUse' ... which was given its value through the input parameter above
  //   //The input parameter is being given a value from whichever page passes one into it when the component is called 
  //   this.text = this.textToUse;

  //   //For testing sake
  //   //Set an interval to 3seconds ... 3000ms ... and emit a value every time it fires 
    
  //     this.somethingHappened.emit("wtf");
  // }


}
