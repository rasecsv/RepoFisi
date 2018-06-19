import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  hide: boolean;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.hide = true;
  }

  getErrorMessageUsername() {
    return this.username.hasError('required') ? 'Debe ingresar un usuario o email' : '';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Debe ingresar su contraseña' : '';
  }

  loginUser() {
    if (this.username.hasError('required') && this.password.hasError('required')) {
      this.snackBar.open('Debe ingresar su nombre de usuario y contraseña', '', {
        duration: 2000,
      });
    } else {
      this.dataService.doLogin(this.username.value, this.password.value).subscribe(
        response => {
          if (response.json().status) {
            localStorage.setItem('person_id', response.json().person_id);
            // this.router.navigate(['list-questions']);
            this.router.navigate(['home-page']);
            this.snackBar.open('Usuario Correcto', 'Aceptar', {
              duration: 2000,
            });
          } else {
            this.snackBar.open('Usuario o contraseña incorrecto', '', {
              duration: 2000,
            });
          }
        }
      );
    }
  }

}
