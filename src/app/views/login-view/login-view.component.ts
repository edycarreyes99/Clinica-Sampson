import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {GlobalService} from '../../services/global.service';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../consts/ToastConsts';

@Component({
  selector: 'app-login',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  // Component's variables
  loginForm: FormGroup;
  doingLogin = false;

  constructor(
    private authService: AuthService,
    private globalService: GlobalService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('edycarreyes@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('123123', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  // Method to get the form control value
  getFormControl(formControlName: string): AbstractControl | null {
    return this.loginForm.get(formControlName);
  }

  // Method to do login-view
  async doLogin(): Promise<boolean> {
    if (!this.loginForm.valid) {
      return false;
    }

    if (this.doingLogin) {
      return false;
    }

    this.doingLogin = true;

    return new Promise(async (resolve, rejects) => {
      await this.authService.login(this.getFormControl('email')?.value, this.getFormControl('password')?.value)
        .then((user) => {
          console.log('Welcome user', user.user?.email);
          this.doingLogin = false;
          this.globalService.showToast(SUCCESS_TOAST, 'Inicio de sesión completo', `Bienvenido ${user.user?.displayName}`);
          resolve(true);
        }).catch((error) => {
          console.error('Error doing login-view:', error);
          this.globalService.showToast(ERROR_TOAST, 'Inicio de sesión fallido', error.toString());
          this.doingLogin = false;
          rejects(error);
        });
    });
  }

}
