import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CoreComponent} from './core/core.component';
import {MustSetupGuard} from './must-setup.guard';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'app/dashboard'
}, {
  path: 'app',
  component: CoreComponent,
  children: [{
    component: DashboardComponent,
    path: 'dashboard',
    canActivate: [
      MustSetupGuard
    ]
  }]
}, {
  path: 'setup',
  loadChildren: './setup/setup.module#SetupModule'
}];

export const RouterConfig: ModuleWithProviders = RouterModule.forChild(routes);
