import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NoAuthenticatedGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>(async (resolve, rejects) => {
      await this.auth.authState.subscribe((user) => {
        if (user) {
          this.router.navigateByUrl('').then((response) => console.log('navigated to login/'));
          resolve(false);
        } else {
          resolve(true);
        }
      }, error => {
        console.error('Error implementing NoAuthenticated guard:', error);
        this.router.navigateByUrl('').then((response) => console.log('navigated to login/'));
        rejects(false);
      });
    });
  }

}
