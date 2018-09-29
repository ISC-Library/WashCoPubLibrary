import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the TestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'test-component',
  templateUrl: 'test.html'
})
export class TestComponent {

  //Supply an Input called 'myText' and asign it to textToUse
  @Input('myText') textToUse;

  //Supply and Output called 'somethingHappened'
  //This Output is of the same name as the custom event we created on the home.ts 
  // you then set this equal to an event emitter, so the component can now detect that event occuring 
  @Output() somethingHappened = new EventEmitter();

  text: string;

  constructor() {
    console.log('Hello TestComponent Component');
    this.text = 'It works! What up son! ';
  }

  //ngAfterViewInit is a method that waits for everything to load before it executes 
  ngAfterViewInit(){
    //Set this.text to 'textToUse' ... which was given its value through the input parameter above
    //The input parameter is being given a value from whichever page passes one into it when the component is called 
    this.text = this.textToUse;

    //For testing sake
    //Set an interval to 3seconds ... 3000ms ... and emit a value every time it fires 
    let interval = setInterval(() => {
      this.somethingHappened.emit("its time");
    }, 3000);
  }

}
