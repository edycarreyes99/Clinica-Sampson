import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {ERROR_TOAST, SUCCESS_TOAST} from '../consts/ToastConsts';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {DatePipe} from '@angular/common';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private toast: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) {
  }

  // Method to show a toast
  showToast(type: number, title: string, message: string): void {
    console.log('Showing toast');
    const toastSettings: Partial<IndividualConfig> = {
      timeOut: 7000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing'
    };
    if (type === SUCCESS_TOAST) {
      this.toast.success(`${message}`, `${title}`, toastSettings);
    } else if (type === ERROR_TOAST) {
      this.toast.error(`${message}`, `${title}`, toastSettings);
    }
  }

  // Method to navigate to other routes
  async navigate(ruta: string, params?: any): Promise<boolean> {
    return this.router.navigate([`/${ruta}`], {
      queryParams: params ? params : {}
    });
  }

  printFirestoreTimestamp(timestamp: Timestamp): string {
    const date: Date = timestamp.toDate();
    return this.datePipe.transform(date, 'd/M/yyyy', 'UTC-6', 'es-ES').toString();
  }
}
