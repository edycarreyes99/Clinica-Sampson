import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {PatientsViewComponent} from './views/patients-view/patients-view.component';
import {AuthenticatedGuard} from './guards/authenticated.guard';
import {NoAuthenticatedGuard} from './guards/no-authenticated.guard';
import {PatientFormViewComponent} from './views/patient-form-view/patient-form-view.component';
import {PatientConsultationsComponent} from "./views/patient-consultations/patient-consultations.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent,
    data: {
      slug: 'Login'
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
  },
  {
    path: 'patient/add',
    component: PatientFormViewComponent,
    data: {
      slug: 'Nuevo paciente',
      formType: 'add'
    },
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'patient/:patientID',
    component: PatientFormViewComponent,
    data: {
      slug: 'Ver paciente',
      formType: 'view'
    },
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'patient/:patientID/consultations',
    component: PatientConsultationsComponent,
    data: {
      slug: 'Consultas'
    },
    canActivate: [AuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
