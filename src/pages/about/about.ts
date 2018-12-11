import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';


//Import Pages
import { LoginPage } from '../login/login';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  showAdmin() {
    if (document.getElementById("adminTextId").style.display = "none") {
      document.getElementById("adminTextId").style.display = "block";
    }
  }


  showImportantLinks() {
    if (document.getElementById("importantLinksText").style.display = "none") {
      document.getElementById("importantLinksText").style.display = "block"
    }
  }

  showUserManual() {

  }

  showAboutUsText() {
    if (document.getElementById("aboutUsText").style.display = "none") {
      document.getElementById("aboutUsText").style.display = "block"
    }
  }

  goToLogin() {
    this.navCtrl.push(LoginPage)
  }

}
