import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Import Check Users Provider
import { CheckUserProvider } from '../check-user/check-user'

//Import AF2 
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


export interface User {
  name: string;
  role: number;
}
 
@Injectable()
export class AdminAuthProvider {
  currentUser: User;
 
  //The events observable holds all the data pulled from the database 
  users: Observable<any[]>;
  
  //Declare the databaseFilter variable
  databaseFilter: BehaviorSubject<string | null> = new BehaviorSubject('');
  
  //Array to hold users converted from the observable 
  usersArray: any;

  constructor(private UserCheckSvc: CheckUserProvider) { 
    //Get all the users
    this.users = this.UserCheckSvc.getUsers(this.databaseFilter);
    
    //Convert usersArray to an array
    this.usersArray = []

    this.users.subscribe((data)=> {
      //Set the .subscription "data" values that are returned to the array "titlesArray[]" and "starTimeArray[]"
      this.usersArray = data
    });
  }
 
  //Get authentication variables from firebase using database service... later
    //the userName ==== FB object.userName ... etc.

  login(userName: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //Loop through the array of users
      for (let i = 0; i < this.usersArray.length; i++) {
        //If their role in the database is a "0" they are admin
        if (this.usersArray[i].role == 0) {
          //Check their credentials against any admin stored in the database
            //If it matches any one of them they will be logged in as an admin
          if (userName === this.usersArray[i].userName && password === this.usersArray[i].password) {
            this.currentUser = {
              name: userName,
              role: 0
            };
            resolve(true);
          }
        } else if (this.usersArray[i].role == 1) {
          if (userName === this.usersArray[i].userName && password === this.usersArray[i].password) {
            this.currentUser = {
              name: name,
              role: 1
            };
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
      //Empty the array so that no credentials are stored within the application lifecycle
      this.usersArray = []
    }); 
  } 

  isLoggedIn() {
    return this.currentUser != null;
  }
 
  isAdmin() {
    return this.currentUser.role === 0;
  }
 
  logout() {
    this.currentUser = null;
  }
}