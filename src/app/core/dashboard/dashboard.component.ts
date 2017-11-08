import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ReplayComponent} from '../replay/replay.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cmessages;
  jmessages;
  userType: string;

  constructor(
    private _afDatabase: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _matDialog: MatDialog
  ) { }

  async sendReplay (id) {
    this._matDialog.open(ReplayComponent, {
      data: {
        complaintID: id
      }
    })
  }

  async ngOnInit() {
    const userId = this._afAuth.auth.currentUser.uid;
    const { ward, userType } = await new Promise<{ward: string, userType: string}>((resolve, reject) => {
      this._afDatabase
        .object('/users/' + userId + '/meta')
        .valueChanges()
        .subscribe(v => resolve(v as any), e => reject(e))
    });
    this.userType = userType;
    if (userType === 'citizen') {
      this.cmessages = this._afDatabase
        .list('/announcements/' + ward)
        .valueChanges();

      this.jmessages = this._afDatabase
        .list('/complaints/' + ward)
        .valueChanges();
    } else {
      this.cmessages = this._afDatabase
        .list('/complaints/' + ward)
        .valueChanges();
    }
  }

  filterArray(array)  {
    const userId = this._afAuth.auth.currentUser.uid;
    array = array || [];
    return array.filter((v: any) => v.userId === userId);
  }

}
