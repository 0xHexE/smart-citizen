import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;
  constructor(
    public _formBuilder: FormBuilder,
    private _auth: AngularFireAuth,
    private _mdSnackbar: MatSnackBar
  ) {
    this.formGroup = _formBuilder.group({
      'email': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  resetPassword() {
    this.isLoading = true;
    this._auth.auth
      .sendPasswordResetEmail(this.formGroup.controls['email'].value)
      .then(docs => this._mdSnackbar.open('Email sent successfully', 'OK'))
      .catch(e => this._mdSnackbar.open(e.message, 'OK'))
      .then(() => this.isLoading = false);
  }
}
