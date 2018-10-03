import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//Custom Component Imports
import { TestComponent } from './test/test';

@NgModule({
	declarations: [
		TestComponent
	],
	imports: [
		BrowserModule,
		//This has to be imported here to allow the use of ionic tags in the components .html files 
		IonicModule
	],
	exports: [
		TestComponent
	]
})

export class ComponentsModule {}
