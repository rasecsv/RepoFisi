import {Component, Inject, Injectable} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-answer',
  templateUrl: './dialog-answer.component.html'
})
export class DialogAnswerComponent {

  description: any;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogAnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.description = new FormControl('', [Validators.required]);
  }

  getErrorMessageDescription() {
    return this.description.hasError('required') ? 'Debe ingresar un contenido para su pregunta' : '';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewAnswer() {
    this.dataService.saveAnswer(localStorage.getItem('person_id'), this.data.idQuestion, this.description.value).subscribe(
        response => {
          this.snackBar.open('Respuesta agregada satisfactoriamente', 'Aceptar', {
            duration: 2000,
          });
          this.dialogRef.close();
        });
  }

}
