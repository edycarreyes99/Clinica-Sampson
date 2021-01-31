import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {ERROR_TOAST, SUCCESS_TOAST} from '../consts/ToastConsts';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private toast: ToastrService
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
}
