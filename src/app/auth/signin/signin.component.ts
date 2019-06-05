import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AuthModel} from '../auth.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinErrorMessage = '';
  constructor(private authService: AuthService, private router: Router) {
        this.authService.signinUserEvent.subscribe(
      (objResult: AuthModel) => {
        // console.log('objResult caught');
       this.signinErrorMessage = objResult.message;
        if (!objResult.isError) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }

}
