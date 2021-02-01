import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {GlobalService} from '../../services/global.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  nameToShow = '';
  sidenavOpen = false;
  isAdmin = false;
  userRole = '';

  title = '';

  // variable que contendra el string de la fecha y hora
  dateTime = '';

  // variable que contendra todos los meses
  // tslint:disable-next-line:max-line-length
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // variable que contendra todos los dias de la semana
  weekDays: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // variable que determina si mostrar o no el navbar
  showNavbar = true;

  clockInterval = 0;

  constructor(
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {

    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        console.log('Navigation ended and updated the path');
        this.route.params.subscribe(async (params) => {
          console.log('Params are:', params);
          await this.authService.getCurrentUser().then((user) => {
            // tslint:disable-next-line:no-non-null-assertion
            this.nameToShow = user.user?.displayName?.toString()!;
          }).catch((error) => {
            console.error('Error getting user from localstorage', error);
          });
        });
        console.log('Current children is:', this.route.snapshot.children[0].data.slug);

        this.title = this.route.snapshot.children[0].data.slug;

        this.showNavbar = this.title !== 'Login';
        this.sidenavOpen = this.title !== 'Login';

        if (this.title === 'Login') {
          clearInterval(this.clockInterval);
          this.clockInterval = -1;
        } else {
          this.extractDateTime();
        }
      }
    });
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }


  // funcion para abrir o cerrar el sidenav
  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }

  // funcion que se ejecutara cada vez que se desee realizar una navegacion entre las rutas de la plataforma
  async navigate(ruta: string): Promise<boolean> {
    return this.globalService.navigate(ruta);
  }

  // funcion para extraer la fecha y la hora a cada segundo
  extractDateTime(): void {
    this.clockInterval = setInterval(() => {
      const date = new Date();
      if ((date.getHours() >= 0) && (date.getHours() <= 12)) {
        // tslint:disable-next-line:max-line-length
        this.dateTime = `${this.weekDays[date.getDay()]} ${date.getDate()} de ${this.months[date.getMonth()]} del ${date.getFullYear()} | ${date.getHours() < 10 ? ''.concat('0', date.getHours().toString()) : date.getHours()}:${date.getMinutes() < 10 ? ''.concat('0', date.getMinutes().toString()) : date.getMinutes()}:${date.getSeconds() < 10 ? '0'.concat(date.getSeconds().toString()) : date.getSeconds()} AM`;
      } else if (date.getHours() > 12) {
        // tslint:disable-next-line:max-line-length
        this.dateTime = `${this.weekDays[date.getDay()]} ${date.getDate()} de ${this.months[date.getMonth()]} del ${date.getFullYear()} | ${(date.getHours() - 12) < 10 ? ''.concat('0', (date.getHours() - 12).toString()) : date.getHours() - 12}:${date.getMinutes() < 10 ? ''.concat('0', date.getMinutes().toString()) : date.getMinutes()}:${date.getSeconds() < 10 ? '0'.concat(date.getSeconds().toString()) : date.getSeconds()} PM`;
      }
    }, 1000);
  }

}
