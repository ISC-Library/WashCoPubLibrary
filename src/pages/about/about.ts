import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';


//Import Pages
import {LoginPage} from '../login/login';
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
    console.log('ionViewDidLoad AboutPage');
  }

  showContactAdmin() {
    // document.getElementById("contactAdminText").className = "contactAdminShow";
    // if(document.getElementById("contactAdminText").className="contactAdminHide"){
    //   document.getElementById("contactAdminText").className="contactAdminShow";}
    //   else{document.getElementById("contactAdminText").className="contactAdminHide";}
    if (document.getElementById('contactAdminText').innerHTML == '') { document.getElementById('contactAdminText').className = 'contactAdminText' };
    document.getElementById('contactAdminText').innerHTML = 'Administrator: Jessica Ross <br> <a href="tel:251-847-2097">Contact Info: 251-847-2097</a><br><a href="mailto:info@wcpls.org">Email: info@wcpls.org</a>';
    document.getElementById('contactAdminText').className = 'contactAdminShow'
  };

  goToLogin(){
    this.navCtrl.push(LoginPage)
  }
  showImportantLinks() {
    if (document.getElementById('importantLinksText').innerHTML==''){document.getElementById('importantLinksText').className='showImportantLinksText'};
    document.getElementById('importantLinksText').innerHTML='<a href="http://www.wcpls.net/">Washington County Public Library</a> <br> <br> <a href="https://chatom.org/">Town of Chatom</a>';
    document.getElementById('importantLinksText').className='importantLinksShow';
  }

  showUserManual() {

  }

  showAboutUsText() {
    document.getElementById("aboutUsText").className = "showAboutUsText";
  }

}
