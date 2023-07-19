import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  login = () => {
    const { username, password } = this.userForm.value;
    this.authService
      .login(username, password)
      .pipe(first())
      .subscribe(
        (token) => {
          this.authService.loadProfile(token);
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.log(error);
        }
      );
  };
}
