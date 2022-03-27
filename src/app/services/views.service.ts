import { Injectable } from '@angular/core';
import {
  LoadingController,
  AlertController,
  PopoverController,
  ModalController,
  ToastController,
  ActionSheetController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ViewsService {
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async generateLoadingCtrl(
    message: string,
    spinner:
      | 'bubbles'
      | 'circles'
      | 'circular'
      | 'crescent'
      | 'dots'
      | 'lines'
      | 'lines-small' = 'bubbles'
  ) {
    return await this.loadingCtrl.create({
      message: message,
      spinner: spinner
    });
  }
  async _showAlertFactory(data: any) {
    return await this.alertCtrl.create(data);
  }

  async _createActionSheet(actionSheetOptions: {
    header?: string;
    subHeader?: string;
    buttons: (
      | {
          text?: string;
          role?: 'cancel' | 'destructive' | 'selected' | string;
          icon?: string;
          cssClass?: string | string[];
          handler?: () => boolean | void | Promise<boolean | void>;
        }
      | string
    )[];
    backdropDismiss?: boolean;
    translucent?: boolean;
    animated?: boolean;
    mode?: 'ios' | 'md';
    keyboardClose?: boolean;
    id?: string;
  }) {
    return await this.actionSheetCtrl.create(actionSheetOptions);
  }

  async _showAlertSimple(title: string, content: string) {
    return await this.alertCtrl.create({
      header: title,
      message: content,
      animated: true,
      buttons: ['Aceptar'],
    });
  }
  async _showPopoverInterface(component: any) {
    return await this.popoverCtrl.create({
      component: component,
      animated: true,
      showBackdrop: true,
    });
  }
  async _createModalController(componentClass: any, data?: any) {
    return await this.modalCtrl.create({
      component: componentClass,
      animated: true,
      showBackdrop: true,
    });
  }

  async _createToastSimple(message: string) {
    return await this.toastCtrl.create({
      message: message,
      duration: 5000,
      buttons: [
        {
          text: 'OK',
          icon: 'checkmark-outline',
        },
      ],
    });
  }

  async _createToasFactory(options: any) {
    return await this.toastCtrl.create(options);
  }
}
