import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  // Method to do login
  async login(email: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, rejects) => {
    });
  }
}
