import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
 
//Import Pages
import { HomePage } from '../home/home';

//Import AdminAuth Provider
import { AdminAuthProvider } from './../../providers/admin-auth/admin-auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  //Hold the information entered by the user
  user = {
    name: "",
    pw: ""
  };

  //Hold the username of the current logged in user
  userName: string;
 
  constructor(public navCtrl: NavController, 
    private adminAuthProvider: AdminAuthProvider, 
    private alertCtrl: AlertController) {
      //Constructor body
    }

 ionViewDidEnter() {
   if (this.adminAuthProvider.currentUser) {
   this.userName = (this.adminAuthProvider.currentUser.name)
   }
 }

  loginUser() {
    this.adminAuthProvider.login(this.user.name.toLowerCase(), this.user.pw).then(success => {
      if (success) {
        //Save the username if successfull
        //this.userName=(this.adminAuthProvider.currentUser.name);
        this.navCtrl.pop();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Login failed',
          message: 'Please check your credentials',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  isLoggedIn() {
    if (this.adminAuthProvider.isLoggedIn()) {
      return true 
    } else {
      return false
    }
  }

  logout() {
    this.adminAuthProvider.logout()
  }
}