import { Injectable } from '@angular/core';

export interface User {
  name: string;
  role: number;
}
 
@Injectable()
export class AdminAuthProvider {
  currentUser: User;
 
  constructor() { }
 
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