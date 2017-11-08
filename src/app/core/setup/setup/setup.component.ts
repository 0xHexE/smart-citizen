import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  isLoading = false;
  wards: Observable<any>;
  formGroup: FormGroup;
  selectedWard;

  constructor(
    public _fbDatabase: AngularFireDatabase,
    public _fbAuth: AngularFireAuth,
    public _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.formGroup = _formBuilder.group({
      'ward': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.wards = this._fbDatabase.list('/wards').valueChanges()
  }

  save() {
    this
      ._fbDatabase
      .object('/users/' + this._fbAuth.auth.currentUser.uid + '/meta')
      .set({
        ward: this.formGroup.controls['ward'].value,
        userType: 'citizen'
      }).then(d => {
        this._router.navigateByUrl('/core/app/dashboard')
      })
  }
}
