import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  createdUser = false;
  formGroup: FormGroup;
  isLoading = false;
  user: Observable<firebase.User>;
  private userSub: Subscription;

  constructor(
    public _formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    private _router: Router,
    private _mdSnackbar: MatSnackBar
  ) {
    this.formGroup = _formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    const username = this.formGroup.controls['email'].value;
    const password = this.formGroup.controls['password'].value;
    this.isLoading = true;

    this.afAuth.auth.createUserWithEmailAndPassword(username, password)
      .then(d => {
        this
          .afAuth
          .auth
          .currentUser
          .sendEmailVerification()
          .then(d => this.createdUser = true)
          .catch(e => this.handleError(e))
          .then(() => this.isLoading = false)
      })
      .catch(err => this.handleError(err))
      .then(() => this.isLoading = false);
  }

  handleError(e) {
    this._mdSnackbar.open(e, 'OK', {
      duration: 10000
    });
  }

}
