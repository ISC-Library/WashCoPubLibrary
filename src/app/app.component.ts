import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

//Import Pages
import { HomePage } from '../pages/home/home';
import { CalendarPage } from '../pages/calendar/calendar';
import { AboutPage } from '../pages/about/about';
import { JobLinksPage } from '../pages/joblinks/joblinks';
import { LoginPage } from '../pages/login/login';
import { NoneExistPage } from '../pages/none-exist/none-exist';
import { CommissionPage } from '../pages/commission/commission';
import { SchoolDistrictsPage } from  '../pages/school-districts/school-districts'
import { LocalGovernmentAndServicesPage } from '../pages/local-government-and-services/local-government-and-services'

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
    this.nav.setRoot(HomePage);
  }

  goToBookShelf() {
    window.open("https://abdodigital.com/?tk=A8A412886D6FFCA174EA2F2E90A6169D", '_system', 'location=yes');
  }

  goToJobLinks() {
    this.nav.push(JobLinksPage);
  }

  goToLocalGovernmentAndServices() {
    this.nav.push(LocalGovernmentAndServicesPage);
  }

  goToHelp() {
    this.nav.push(AboutPage);
  }

  goToLogin() {
    this.nav.push(LoginPage);
  }

  

  //School Districts Page
  schoolDistricts(districtSelection) {
    this.nav.push(SchoolDistrictsPage, {districtSelection});
    // this.nav.push(SchoolDistrictsPage)
  }

  commissionDistricts(districtSelection) {
    this.nav.push(CommissionPage, {districtSelection});
  }


  //#region McIntosh

  openMcintosh() {
    document.getElementById("mcintoshInfoShown").style.display = "block";
    document.getElementById("mcintoshInfoHidden").style.display = "none";

    let elementsListMcintoshHidden = document.getElementsByClassName("mcintoshInfoHidden");
    if (elementsListMcintoshHidden.length > 0) {
      let mcintoshLengthHidden = elementsListMcintoshHidden.length
      //Show Mcintosh :: If not already shown
      for (let i = (mcintoshLengthHidden - 1); i > -1; i--) {
        elementsListMcintoshHidden[i].className = "mcintoshInfoShown";
      }
    }
  }

  closeMcintosh() {
    document.getElementById("mcintoshInfoShown").style.display = "none";
    document.getElementById("mcintoshInfoHidden").style.display = "block";

    let elementsListMcintoshShown = document.getElementsByClassName("mcintoshInfoShown");
    if (elementsListMcintoshShown.length > 0) {
      let mcintoshLengthShown = elementsListMcintoshShown.length
      //Show Mcintosh :: If not already shown
      for (let i = (mcintoshLengthShown - 1); i > -1; i--) {
        elementsListMcintoshShown[i].className = "mcintoshInfoHidden";
      }
    }
  }

  //Links inside McIntosh Category
  mcintoshWebsite() {
    window.open("https://mcintoshal.com/", '_system', 'location=yes');
  }

  mcintoshFacebook() {
    window.open("https://www.facebook.com/places/Things-to-do-in-McIntosh-Alabama/104057586296349/", '_system', 'location=yes')
  }
  //#endregion

  //#region Leroy

  openLeroy() {
    document.getElementById("leroyInfoShown").style.display = "block";
    document.getElementById("leroyInfoHidden").style.display = "none";

    let elementsListLeroyHidden = document.getElementsByClassName("leroyInfoHidden");
    if (elementsListLeroyHidden.length > 0) {
      let leroyLengthHidden = elementsListLeroyHidden.length
      //Show Leroy :: If not already shown
      for (let i = (leroyLengthHidden - 1); i > -1; i--) {
        elementsListLeroyHidden[i].className = "leroyInfoShown";
      }
    }
  }

  closeLeroy() {
    document.getElementById("leroyInfoShown").style.display = "none";
    document.getElementById("leroyInfoHidden").style.display = "block";

    let elementsListLeroyShown = document.getElementsByClassName("leroyInfoShown");
    if (elementsListLeroyShown.length > 0) {
      let leroyLengthShown = elementsListLeroyShown.length
      //Show Leroy :: If not already shown
      for (let i = (leroyLengthShown - 1); i > -1; i--) {
        elementsListLeroyShown[i].className = "leroyInfoHidden";
      }
    }
  }

  //Links inside Leroy Category
  leroyWebsite() {
    this.nav.push(NoneExistPage);
  }

  leroyFacebook() {
    window.open("https://www.facebook.com/places/Things-to-do-in-Leroy-Alabama/108550659166642/", '_system', 'location=yes')
  }
  //#endregion

  //#region Fruitdale

  openFruitdale() {
    document.getElementById("fruitdaleInfoShown").style.display = "block";
    document.getElementById("fruitdaleInfoHidden").style.display = "none";

    let elementsListFruitdaleHidden = document.getElementsByClassName("fruitdaleInfoHidden");
    if (elementsListFruitdaleHidden.length > 0) {
      let fruitdaleLengthHidden = elementsListFruitdaleHidden.length
      //Show Fruitdale :: If not already shown
      for (let i = (fruitdaleLengthHidden - 1); i > -1; i--) {
        elementsListFruitdaleHidden[i].className = "fruitdaleInfoShown";
      }
    }
  }

  closeFruitdale() {
    document.getElementById("fruitdaleInfoShown").style.display = "none";
    document.getElementById("fruitdaleInfoHidden").style.display = "block";

    let elementsListFruitdaleShown = document.getElementsByClassName("fruitdaleInfoShown");
    if (elementsListFruitdaleShown.length > 0) {
      let fruitdaleLengthShown = elementsListFruitdaleShown.length
      //Show Fruitdale :: If not already shown
      for (let i = (fruitdaleLengthShown - 1); i > -1; i--) {
        elementsListFruitdaleShown[i].className = "fruitdaleInfoHidden";
      }
    }
  }

  //Links inside Fruitdale Category
  fruitdaleWebsite() {
    this.nav.push(NoneExistPage);
  }

  fruitdaleFacebook() {
    window.open("https://www.facebook.com/places/Things-to-do-in-Fruitdale-Alabama/104904699545501/", '_system', 'location=yes')
  }
  //#endregion

  //#region Chatom

  //HTML is reformated to show the "Chatom" element with sections on function init
  openChatom() {
    document.getElementById("chatomInfoShown").style.display = "block";
    document.getElementById("chatomInfoHidden").style.display = "none";

    let elementsListChatomHidden = document.getElementsByClassName("chatomInfoHidden");
    if (elementsListChatomHidden.length > 0) {
      let chatomLengthHidden = elementsListChatomHidden.length
      //Show Chatom :: If not already shown
      for (let i = (chatomLengthHidden - 1); i > -1; i--) {
        elementsListChatomHidden[i].className = "chatomInfoShown";
      }
    }
  }

  //HTML is reformated to hide the "Chatom" element with sections on function init
  closeChatom() {
    document.getElementById("chatomInfoShown").style.display = "none";
    document.getElementById("chatomInfoHidden").style.display = "block";

    let elementsListChatomShown = document.getElementsByClassName("chatomInfoShown");
    if (elementsListChatomShown.length > 0) {
      let chatomLengthShown = elementsListChatomShown.length
      //Show Chatom :: If not already shown
      for (let i = (chatomLengthShown - 1); i > -1; i--) {
        elementsListChatomShown[i].className = "chatomInfoHidden";
      }
    }
  }

  //Links inside Chatom Category
  chatomWebsite() {
    window.open("https://www.chatom.org", '_system', 'location=yes');
  }

  chatomFacebook() {
    window.open("https://www.facebook.com/places/Things-to-do-in-Chatom-Alabama/108413832512293/", '_system', 'location=yes')
  }
  //#endregion

  //#region Millry

  openMillry() {
    document.getElementById("millryInfoShown").style.display = "block";
    document.getElementById("millryInfoHidden").style.display = "none";

    let elementsListMillryHidden = document.getElementsByClassName("millryInfoHidden");
    if (elementsListMillryHidden.length > 0) {
      let millryLengthHidden = elementsListMillryHidden.length
      //Show Millry :: If not already shown
      for (let i = (millryLengthHidden - 1); i > -1; i--) {
        elementsListMillryHidden[i].className = "millryInfoShown";
      }
    }
  }

  closeMillry() {
    document.getElementById("millryInfoShown").style.display = "none";
    document.getElementById("millryInfoHidden").style.display = "block";

    let elementsListMillryShown = document.getElementsByClassName("millryInfoShown");
    if (elementsListMillryShown.length > 0) {
      let millryLengthShown = elementsListMillryShown.length
      //Show Millry :: If not already shown
      for (let i = (millryLengthShown - 1); i > -1; i--) {
        elementsListMillryShown[i].className = "millryInfoHidden";
      }
    }
  }

  //Links inside Millry Category
  millryWebsite() {
    this.nav.push(NoneExistPage);
  }

  millryFacebook() {
    window.open("https://www.facebook.com/places/Things-to-do-in-Millry-Alabama/103997982970453/", '_system', 'location=yes')
  }
  //#endregion
}
