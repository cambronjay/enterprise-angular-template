import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertModalComponent } from '../../../modals/alert/alert.component';
import { LoaderModalComponent } from '../../../modals/loader/loader.component';

@Injectable()
export class AngularMaterialService {
  public alert: any;
  public loader: any;

  constructor(private dialog: MatDialog) { }

  public showAlert(title: string, message: string) {
    this.alert = this.dialog.open(AlertModalComponent, {
      width: '250px',
      disableClose: true,
      data: { title: title, message: message }
    });
  }

  public showLoader(message: string) {
    this.loader = this.dialog.open(LoaderModalComponent, {
      width: '200px',
      disableClose: true,
      data: { message: message }
    });
  }

  public closeDialog(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dialog.closeAll();
      resolve();
    });
  }

}