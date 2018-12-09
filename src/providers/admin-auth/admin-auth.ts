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

  login(userName: string, password: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (userName === 'admin' && password === 'whodis') {
        this.currentUser = {
          name: userName,
          role: 0
        };
        resolve(true);
      } else if (userName === 'user' && password === 'user') {
        this.currentUser = {
          name: name,
          role: 1
        };
        resolve(true);
      }  else {
        resolve(false);
      }
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