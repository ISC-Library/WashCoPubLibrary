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
 
  user = {
    name: "",
    pw: ""
  };
 
  constructor(public navCtrl: NavController, 
    private adminAuthProvider: AdminAuthProvider, 
    private alertCtrl: AlertController) {
      //Constructor body
    }
 
  loginUser() {
    this.adminAuthProvider.login(this.user.name, this.user.pw).then(success => {
      if (success) {
        this.navCtrl.push(HomePage);
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
}