import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {RouterConfig} from './app.router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoLoginAuthGuard} from './guards/no-login-auth.guard';
import {AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterConfig,
    BrowserAnimationsModule,
  ],
  providers: [
    NoLoginAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
