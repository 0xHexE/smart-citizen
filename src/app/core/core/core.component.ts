import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ComplaintComponent} from '../complaint/complaint.component';
import {AnnouncementsComponent} from '../announcements/announcements.component';
import {MatDialog} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  apps: {name: string, action: Action}[] = [{
    name: 'Dashboard',
    action: {
      actionType: 'HREF',
      actionUrl: '/core/app/dashboard'
    }
  }];

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _afDatabase: AngularFireDatabase,
    private _afAuth: AngularFireAuth
  ) { }

  logout() {
    this._afAuth.auth.signOut().then(docs => this._router.navigateByUrl('/'));
  }

  async ngOnInit() {
    const userId = this._afAuth.auth.currentUser.uid;
    const { userType } = await new Promise<{ward: string, userType: string}>((resolve, reject) => {
      this._afDatabase
        .object('/users/' + userId + '/meta')
        .valueChanges()
        .subscribe(v => resolve(v as any), e => reject(e))
    });
    if (userType === 'citizen') {
      this.apps.push({
        name: 'Complaint',
        action: {
          actionType: 'DIALOG',
          actionComponent: 'complaint'
        }
      });
    } else if (userType === 'corporator') {
      this.apps.push({
        name: 'Announcements',
        action: {
          actionType: 'DIALOG',
          actionComponent: 'announcements'
        }
      });
    }
  }

  view (action: Action) {
    if (action.actionType === 'HREF') {
      return this._router.navigateByUrl(action.actionUrl)
    } else {
      let component;
      switch (action.actionComponent) {
        case 'complaint':
          component = ComplaintComponent;
          break;
        case 'announcements':
          component = AnnouncementsComponent;
          break;
        default:
          return
      }
      this._matDialog.open(component)
    }
  }
}

interface Action {
  actionType: 'HREF' | 'DIALOG';
  actionUrl?: string;
  actionComponent?: string
}
