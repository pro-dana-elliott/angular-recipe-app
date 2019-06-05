import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthModel} from '../auth.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupErrorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.signupUserEvent.subscribe(
      (objResult: AuthModel) => {
        // console.log('objResult caught');
       this.signupErrorMessage = objResult.message;
        if (!objResult.isError) {
          this.signupErrorMessage += ' Redirecting in 3 secs…';
          setTimeout(() => {
            this.router.navigate(['signin']);
            }, 3000);
        }
      }
    );
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);


    // this.authService.isAuthenticated();

  }

}
