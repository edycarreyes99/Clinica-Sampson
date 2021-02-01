import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {GlobalService} from '../../services/global.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

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

  constructor(
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public authService: AuthService,
    public router: Router
  ) {
    // en el momento que el componente se construye se manda a llamar a la funcion para extraer la fecha y la hora
    this.extractDateTime();
  }

  ngOnInit(): void {
  }

  // funcion para abrir o cerrar el sidenav
  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }

  // funcion que se ejecutara cada vez que se desee realizar una navegacion entre las rutas de la plataforma
  navigate(ruta: string): void {
    this.globalService.navigate(ruta);
  }

  // funcion para extraer la fecha y la hora a cada segundo
  extractDateTime(): void {
    setInterval(() => {
      const fechaHora = new Date();
      if ((fechaHora.getHours() >= 0) && (fechaHora.getHours() <= 12)) {
        // tslint:disable-next-line:max-line-length
        this.dateTime = `${this.weekDays[fechaHora.getDay()]} ${fechaHora.getDate()} de ${this.months[fechaHora.getMonth()]} del ${fechaHora.getFullYear()} | ${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()} AM`;
      } else if (fechaHora.getHours() > 12) {
        // tslint:disable-next-line:max-line-length
        this.dateTime = `${this.weekDays[fechaHora.getDay()]} ${fechaHora.getDate()} de ${this.months[fechaHora.getMonth()]} del ${fechaHora.getFullYear()} | ${fechaHora.getHours() - 12}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()} PM`;
      }
    }, 1000);
  }

  // Method to logout
  async logout(): Promise<void> {
    await this.authService.logout().then(async (status) => {
      if (status) {
        await this.globalService.navigate('');
      }
    }).catch((error) => {
      console.log('Error logging out:', error);
    });
  }

}
