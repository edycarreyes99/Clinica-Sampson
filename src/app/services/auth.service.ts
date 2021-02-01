import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {CURRENT_USER_LOCALSTORAGE} from '../consts/AuthConsts';
import {GlobalService} from './global.service';
import {ERROR_TOAST, SUCCESS_TOAST} from "../consts/ToastConsts";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private globalService: GlobalService
  ) {
  }

  // Method to do login-view
  async login(email: string, password: string): Promise<UserCredential> {
    return new Promise(async (resolve, rejects) => {
      await this.auth.signInWithEmailAndPassword(email, password).then(async (user) => {
        await this.setUserToLocalstorage(user);
        resolve(user);
      }).catch((error) => {
        console.error('Error doing login-view:', error);
        rejects(error);
      });
    });
  }

  // Method to set the current user to localstorage
  async setUserToLocalstorage(user: UserCredential): Promise<UserCredential> {
    return new Promise(async (resolve, rejects) => {
      await localStorage.setItem(CURRENT_USER_LOCALSTORAGE, JSON.stringify(user));
      const updatedUserString: string | null = await localStorage.getItem(CURRENT_USER_LOCALSTORAGE);
      if (updatedUserString) {
        const updatedUser: UserCredential = JSON.parse(updatedUserString);
        resolve(updatedUser);
      } else {
        rejects(null);
      }
    });
  }

  // Method to get the current user from localstorage
  async getCurrentUser(): Promise<UserCredential> {
    return new Promise(async (resolve, rejects) => {
      const currentUserString: string | null = await localStorage.getItem(CURRENT_USER_LOCALSTORAGE);
      if (currentUserString) {
        const currentUser: UserCredential = JSON.parse(currentUserString);
        resolve(currentUser);
      } else {
        rejects(null);
      }
    });
  }

  // Method to logout
  async logout(): Promise<boolean> {
    return new Promise(async (resolve, rejects) => {
      await this.auth.signOut().then((user) => {
        console.log('Goodbye!');
        this.globalService.showToast(SUCCESS_TOAST, 'Cierre de sesión correcto', '¡Vuelva pronto!');
      }).catch((error) => {
        console.error('Error doing logout:', error);
        this.globalService.showToast(ERROR_TOAST, 'Error al cerrar sesión', error.toString());
        rejects(false);
      });
    });
  }
}
