import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

// Firebase Modules
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

// Custom modules
import {MaterialDesignModule} from './modules/material-design/material-design.module';
import {ToastrModule} from 'ngx-toastr';

// Custom Services
import {AuthService} from './services/auth.service';
import {GlobalService} from './services/global.service';

// Environment's variables
import {environment} from '../environments/environment';

// Custom components
import {LoginViewComponent} from './views/login-view/login-view.component';
import {PatientsViewComponent} from './views/patients-view/patients-view.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    PatientsViewComponent,
    SideNavComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // Custom Modules
    MaterialDesignModule,
    ToastrModule.forRoot(),

    // Firebase modules
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  providers: [
    // Custom services
    AuthService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
