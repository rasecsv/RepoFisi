import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  firstName: any;
  lastName: any;
  username: any;
  email: any;
  password: any;
  rePassword: any;
  hide: boolean;
  dataPerson: any;
  imagePerson: any;
  avatar: any;
  base64Image: any;
  openedImage: boolean;
  canSaveImage: boolean;

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
    this.avatar = new FormControl(null);
  }

  ngOnInit() {
    this.hide = true;
    this.openedImage = false;
    this.canSaveImage = false;
    this.obtainDataPerson();
  }

  getErrorMessage() {
    if (this.firstName.hasError('required') || this.lastName.hasError('required')
      || this.username.hasError('required') || this.email.hasError('required')) {
      return 'Debe completar este campo';
    } else {
      return '';
    }
  }

  obtainDataPerson() {
    this.dataService.getUserData(localStorage.getItem('person_id')).subscribe(
      response => {
        this.dataPerson = response.json();
        this.firstName.setValue(this.dataPerson.user.first_name);
        this.lastName.setValue(this.dataPerson.user.last_name);
        this.username.setValue(this.dataPerson.user.username);
        this.email.setValue(this.dataPerson.user.email);
        if (this.dataPerson.person_image === 'Sin imagen') {
          this.imagePerson = 'http://alarishealth.com/wp-content/uploads/2014/06/no-user.png';
        } else {
          this.imagePerson = 'http://' + this.dataPerson.person_image;
        }
      }
    );
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.canSaveImage = true;
        this.base64Image = reader.result;
      };
    }
  }

  changeImagePerson() {
    if (this.canSaveImage) {
      this.dataService.uploadImage(localStorage.getItem('person_id'), this.base64Image).subscribe(
        response => {
          this.canSaveImage = false;
          this.snackBar.open('Se guardó su foto de perfil con éxito', '', {
            duration: 2000,
          });
          location.reload();
        }
      );
    } else {
      this.snackBar.open('No ha elegido ninguna imagen', '', {
        duration: 2000,
      });
    }
  }

  openImageChooser() {
    this.openedImage = true;
  }

  cancelImageAction() {
    this.openedImage = false;
  }

  updateProfile() {
    console.log('Missing functionality');
  }

}
