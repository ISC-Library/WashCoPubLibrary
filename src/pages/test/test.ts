import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/observable';
import { Component } from '@angular/core';


//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

//Import Pages
import { HomePage } from '../home/home';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  //Variable we are going to use in our two way data binding 
  username: any;

  //Create the usernames variable: give it the type of "AngularFireList"
  //This is for database troubleshooting and dummy data entry 
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    afDatabase: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
      //this is for dummy data entry
     this.usersRef = afDatabase.list('users');
 } 

   //Function to navigate to the "HomePage" using the NavController 
   navigateToHomePage(){
    this.navCtrl.push(HomePage);
  }

  //Add User
  addUser(){
    let prompt = this.alertCtrl.create({
      title: 'User Name',
      message: "Enter a name for this new user you're so keen on adding",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'First Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newUserRef = this.usersRef.push({});
   
            newUserRef.set({
              id: newUserRef.key,
              firstName: data.firstName
            });
          }
        }
      ]
    });
    prompt.present();
  }


}
