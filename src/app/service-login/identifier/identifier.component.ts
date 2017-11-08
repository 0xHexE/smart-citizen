import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-identifier',
  templateUrl: './identifier.component.html',
  styleUrls: ['./identifier.component.scss']
})
export class IdentifierComponent implements OnInit {
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
    this.userSub = this.user.subscribe(v => {
      if (v) {
        this._router.navigateByUrl('/');
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  login() {
    const username = this.formGroup.controls['email'].value;
    const password = this.formGroup.controls['password'].value;
    this.isLoading = true;
    if (isNaN(username.trim('+'))) {
      this.afAuth.auth.signInWithEmailAndPassword(username, password)
        .catch(err => this.handleError(err))
        .then(docs => {})
        .then(() => this.isLoading = false);
    } else {
    }
  }

  handleError(e) {
    this._mdSnackbar.open(e, 'OK', {
      duration: 10000
    });
  }
}
