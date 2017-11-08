import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterConfig } from './core.router';
import { CoreComponent } from './core/core.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { DisplayComplaintComponent } from './display-complaint/display-complaint.component';
import {OkCommonComponentModule} from '../ok-common-component/ok-common-component.module';
import {MatDialogModule} from '@angular/material';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { MustSetupGuard } from './must-setup.guard';
import { ReplayComponent } from './replay/replay.component'

@NgModule({
  imports: [
    CommonModule,
    RouterConfig,
    OkCommonComponentModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    DashboardComponent,
    CoreComponent,
    ComplaintComponent,
    AnnouncementsComponent,
    DisplayComplaintComponent,
    ReplayComponent
  ],
  providers: [
    MustSetupGuard
  ],
  entryComponents: [
    ComplaintComponent,
    AnnouncementsComponent
  ]
})
export class CoreModule { }
