import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.setupNotificationPush();
      }
    });
  }

  setupNotificationPush() {
    this.oneSignal.startInit('5e9ba571-db06-4f91-bd03-2ba0e12cfb93', '976905927787');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe(data => {
      this.displayToastNotification(data);
    });

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      console.log(data);
    });

    this.oneSignal.endInit();
  }

  async displayToastNotification(data) {
    const toast = await this.toastController.create({
      header: data.payload.title,
      message: data.payload.body
    });
    toast.present();
  }
}
