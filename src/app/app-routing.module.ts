import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {PatientsViewComponent} from './views/patients-view/patients-view.component';
import {AuthenticatedGuard} from './guards/authenticated.guard';
import {NoAuthenticatedGuard} from './guards/no-authenticated.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent,
    data: {
      slug: 'Inicio de sesión'
    },
    canActivate: [NoAuthenticatedGuard]
  },
  {
    path: '',
    component: PatientsViewComponent,
    data: {
      slug: 'Pacientes'
    },
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
