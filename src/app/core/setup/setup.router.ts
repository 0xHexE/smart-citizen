import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {SetupComponent} from './setup/setup.component';

const routes: Routes = [{
  path: '',
  component: SetupComponent
}];

export const RouterConfig: ModuleWithProviders = RouterModule.forChild(routes);
