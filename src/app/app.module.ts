import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

// Custom modules
import {MaterialDesignModule} from './modules/material-design/material-design.module';

// Custom Services
import {AuthService} from './services/auth.service';

// Custom components
import {LoginComponent} from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Custom Modules
    MaterialDesignModule,
    ReactiveFormsModule
  ],
  providers: [
    // Custom services
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
