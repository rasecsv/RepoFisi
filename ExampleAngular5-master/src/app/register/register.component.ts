import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: any;
  lastName: any;
  username: any;
  email: any;
  password: any;
  rePassword: any;
  hide: boolean;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.username = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.rePassword = new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.hide = true;
  }

  getErrorMessage() {
    if (this.firstName.hasError('required') || this.lastName.hasError('required')
      || this.username.hasError('required') || this.email.hasError('required')
      || this.password.hasError('required') || this.rePassword.hasError('required')) {
      return 'Debe completar este campo';
    } else {
      return '';
    }
  }

  registerUser() {
    if (this.firstName.hasError('required') && this.lastName.hasError('required') && this.username.hasError('required')
    && this.email.hasError('required') && this.password.hasError('required') && this.rePassword.hasError('required')) {
      this.snackBar.open('Debe de completar los campos requeridos!', '', {
        duration: 2000,
      });
    } else {
      if (this.password.value === this.rePassword.value) {
        this.dataService.registerUser(this.firstName.value, this.lastName.value,
          this.email.value, this.username.value, this.password.value).subscribe(
          response => {
            if (response.json().status) {
              this.snackBar.open('Registro Completado', 'Aceptar', {
                duration: 2000,
              });
              this.router.navigate(['']);
            } else {
              this.snackBar.open('Ocurrio un problema', '', {
                duration: 2000,
              });
            }
          }
        );
      } else {
        this.snackBar.open('Las contraseñaa no coinciden', '', {
          duration: 2000,
        });
      }
    }
  }

}
