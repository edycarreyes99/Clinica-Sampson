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

// Environment's variables
import {environment} from '../environments/environment';

// Custom components
import {LoginComponent} from './views/login/login.component';
import {GlobalService} from "./services/global.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
