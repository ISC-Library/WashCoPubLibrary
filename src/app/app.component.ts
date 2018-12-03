import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//Import Pages
import { HomePage } from '../pages/home/home';
import { CalendarPage } from '../pages/calendar/calendar';
import { AboutPage } from '../pages/about/about';
import { JobLinksPage } from '../pages/joblinks/joblinks';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav
  rootPage: any = HomePage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToHome() {
    this.nav.push(HomePage);
  }
  goToHelp() {
    this.nav.push(AboutPage);
  }

  goToJobLinks() {
    this.nav.push(JobLinksPage);
  }

  goToLogin() {
    this.nav.push(LoginPage);
  }

  goToBookShelf() {
    window.open("https://abdodigital.com/?tk=A8A412886D6FFCA174EA2F2E90A6169D", '_system', 'location=yes');
  }

  openChatom() {
    document.getElementById("chatomInfoShown").style.display="block";
    document.getElementById("chatomInfoHidden").style.display="none";

    let elementsListChatomHidden= document.getElementsByClassName("chatomInfoHidden");
      if (elementsListChatomHidden.length > 0) {
        let chatomLengthHidden = elementsListChatomHidden.length
        //Show Chatom :: If not already shown
        for (let i = (chatomLengthHidden -1); i > -1; i--) {
          elementsListChatomHidden[i].className = "chatomInfoShown";
        }
      }



  }
  closeChatom() {
    document.getElementById("chatomInfoShown").style.display="none";
    document.getElementById("chatomInfoHidden").style.display="block";

    let elementsListChatomShown= document.getElementsByClassName("chatomInfoShown");
      if (elementsListChatomShown.length > 0) {
        let chatomLengthShown = elementsListChatomShown.length
        //Show Chatom :: If not already shown
        for (let i = (chatomLengthShown -1); i > -1; i--) {
          elementsListChatomShown[i].className = "chatomInfoHidden";
        }
      }

  }

  openFruitdale() {

  }

  openMcintosh() {

  }

  openMillry() {
  }

  openLeroy() {
  }

  chatomWebsite() {
    window.open("https://www.chatom.org", '_system', 'location=yes');
  }

  chatomFacebook() {
    window.open("https://www.facebook.com/places/Things-to-do-in-Chatom-Alabama/108413832512293/", '_system', 'location=yes')
  }
}
