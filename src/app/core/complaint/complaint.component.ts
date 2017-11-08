import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public _formBuilder: FormBuilder,
    public _fbDatabase: AngularFireDatabase,
    public _fbAuth: AngularFireAuth,
    private _matDialogRef: MatDialogRef<ComplaintComponent>
  ) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      'name': ['', Validators.required],
      'desc': ['', Validators.required]
    })
  }

  async submit(name?, desc?) {
    name = name || this.formGroup.controls['name'].value;
    desc = desc || this.formGroup.controls['desc'].value;
    const userId = this._fbAuth.auth.currentUser.uid;
    const { ward } = await new Promise<{ward: string}>((resolve, reject) => {
      this._fbDatabase
        .object('/users/' + userId + '/meta')
        .valueChanges()
        .subscribe(v => resolve(v as any), e => reject(e))
    });
    this._fbDatabase
      .list(`/complaints/${ward}`)
      .push({
        name: name,
        description: desc,
        userId: userId
      }).then(d => {
        this._matDialogRef.close()
      })
  }
}
