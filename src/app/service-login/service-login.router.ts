import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {IdentifierComponent} from './identifier/identifier.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'identifier'
},{
  path: 'identifier',
  component: IdentifierComponent
}, {
  path: 'forget',
  component: ForgetPasswordComponent
}, {
  path: 'registration',
  component: RegistrationComponent
}];

export const RouterConfig: ModuleWithProviders = RouterModule.forChild(routes);
