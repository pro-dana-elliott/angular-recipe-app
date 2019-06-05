import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Router} from '@angular/router';
import { Injectable} from '@angular/core';
import {AuthModel} from './auth.model';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {
  token: string;
  signupUserEvent = new Subject<AuthModel>();
  signinUserEvent = new Subject<AuthModel>();

  constructor(private router: Router) {}

  signupUser(email: string, password: string)  {
    return new Promise( (resolve) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((authData) => {
            // console.log('Auth Service signupUser Worked: ' + authData);
            const result = new AuthModel('Register user completed.', false);
               this.signupUserEvent.next(result);
           })
      .catch((error) => {
               // console.log('Auth Service signupUser failed: ' + error);
               const result = new AuthModel(error.message, true);
               this.signupUserEvent.next(result);
            });
    });
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken()
          .then(
            (tk: string) => {
              this.token = tk;
              const result = new AuthModel('Login user completed.', false);
              this.signinUserEvent.next(result);
            }
          );
        }
      )
      .catch( error => {
          const result = new AuthModel(error.message, true);
          this.signinUserEvent.next(result);
         // console.log('signinUser failed');
      });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (tk: string) => this.token = tk
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

}
