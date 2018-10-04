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
  //Class variable to hold the value being typed into the input box by the user (the one tied to the keydown event)
  keydownValue: Observable<any[]>;

  //Declare the databaseFilter variable, which is the variable the "TestProvider.getUsers" function takes as a parameter 
  //RXJS is a javascript framework
  //Behavior subject is a data type that contains multiple elements
  //Very usefull for passing data to the provider 
  databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');
  

  //Inject the Provider into the constructor *****
  constructor(public testSvc: TestProvider) {}



 //Function to interact with the "TestProvider" via button
  callTestProvider(){
    console.log(this.textToUse);
    this.databaseFilter.next(this.textToUse);
    this.users = this.testSvc.getUsers(this.databaseFilter);
  }

//Function to interact with the "TestProvider" via keydown event (aka as the user is typing)
  userDudes(){
    //As the user types in the textbox, take that value into the variable "keydownValue"
    //The following line uses the ".next" property of behavior subject type to set the "databaseFilter" value to the "keydownValue"
    this.databaseFilter.next(this.keydownValue)
    console.log(this.databaseFilter);
    //Then set the "users" object variable equal to what is returned from the following call to the provider...
      //The arguement being passed is the filter that was set to what the user typed in the box dynamically
    this.users = this.testSvc.getUsers(this.databaseFilter);
  }

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
