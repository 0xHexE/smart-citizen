import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup/setup.component';
import {OkCommonComponentModule} from '../../ok-common-component/ok-common-component.module';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterConfig} from './setup.router';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    OkCommonComponentModule,
    AngularFireDatabaseModule,
    RouterConfig,
    AngularFireAuthModule
  ],
  declarations: [
    SetupComponent
  ]
})
export class SetupModule { }
