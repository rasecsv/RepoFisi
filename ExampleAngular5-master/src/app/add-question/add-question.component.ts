import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  title: any;
  description: any;
  listTags: any[];
  tags: FormControl;
  options: any[];
  filteredOptions: Observable<string[]>;
  base64Image: any;
  openedImage: boolean;
  canSaveImage: boolean;
  imageQuestion: any;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.title = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.tags = new FormControl();
    this.imageQuestion = new FormControl(null);
  }

  ngOnInit() {
    this.openedImage = false;
    this.canSaveImage = false;
    this.listAllTags();
  }

  getErrorMessageTitle() {
    return this.title.hasError('required') ? 'Debe ingresar un título para su pregunta' : '';
  }

  getErrorMessageDescription() {
    return this.description.hasError('required') ? 'Debe ingresar un contenido para su pregunta' : '';
  }

  addNewQuestion() {
    if (this.title.hasError('required') && this.description.hasError('required')) {
      this.snackBar.open('Necesita completar los campos', '', {
        duration: 2000,
      });
    } else {
      this.dataService.addQuestion(localStorage.getItem('person_id'), this.title.value, this.description.value,
        this.tags.value).subscribe(
          response => {
            if (this.canSaveImage) {
              this.addImage(response.json().id);
            } else {
              this.router.navigate(['list-questions']);
              this.snackBar.open('Pregunta agregada correctamente', 'Aceptar', {
                duration: 2000,
              });
            }
          }
        );
    }
  }

  goListQuestions() {
    this.router.navigate(['list-questions']);
  }

  listAllTags() {
    this.dataService.getTags(false).subscribe(
      response => {
        this.options = response.json();
        this.filteredOptions = this.tags.valueChanges.pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filter(name) : this.options.slice())
        );
      }
    );
  }

  filter(val: string): any[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  displayFn(tag?: any): string | undefined {
    return tag ? tag.name : undefined;
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

  addImage(idQuestion) {
    this.dataService.uploadQuestionImage(idQuestion, this.base64Image).subscribe(
      response => {
        this.router.navigate(['list-questions']);
        this.snackBar.open('Pregunta agregada correctamente', 'Aceptar', {
          duration: 2000,
        });
      }
    );
  }

  openImageChooser() {
    this.openedImage = true;
  }

  cancelImageAction() {
    this.openedImage = false;
  }

}
