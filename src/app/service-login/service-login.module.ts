import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { IdentifierComponent } from './identifier/identifier.component';
import { RegistrationComponent } from './registration/registration.component';
import { OkCommonComponentModule } from '../ok-common-component/ok-common-component.module'
import {RouterConfig} from './service-login.router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    OkCommonComponentModule,
    RouterConfig,
    AngularFireAuthModule
  ],
  declarations: [
    ForgetPasswordComponent,
    IdentifierComponent,
    RegistrationComponent
  ]
})
export class ServiceLoginModule { }
