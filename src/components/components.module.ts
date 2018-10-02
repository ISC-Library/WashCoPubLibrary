import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Custom Component Imports
import { TestComponent } from './test/test';

@NgModule({
	declarations: [
		TestComponent
	],
	imports: [
		BrowserModule
	],
	exports: [
		TestComponent
	]
})

export class ComponentsModule {}
