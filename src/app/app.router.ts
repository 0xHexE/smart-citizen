import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {NoLoginAuthGuard} from './guards/no-login-auth.guard';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: '/core/app/dashboard'
  }, {
    path: 'service-login',
    redirectTo: 'ServiceLogin'
  }, {
    path: 'ServiceLogin',
    loadChildren: './service-login/service-login.module#ServiceLoginModule'
  }, {
    path: 'core',
    loadChildren: './core/core.module#CoreModule',
    canActivate: [
      NoLoginAuthGuard
    ]
  }
];

export const RouterConfig: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
