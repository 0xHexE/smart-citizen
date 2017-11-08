import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {
  replayMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _matDialog: MatDialogRef<ReplayComponent>,
    private _afDatabase: AngularFireDatabase
  ) { }

  ngOnInit() {
  }

  async submit () {
    await this._afDatabase.object(`/complaints/${this.data.complaintID}`)
      .update({
        replay: this.replayMessage
      });
    this._matDialog.close()
  }

}
