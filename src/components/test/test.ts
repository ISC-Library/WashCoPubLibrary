import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello TestComponent Component');
    this.text = 'It works! What up son!';
  }

}
