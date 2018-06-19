import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogAnswerComponent } from './../dialog-answer/dialog-answer.component';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  dataExample: any[];
  listQuestions: any[];
  listAnswers: any[];
  animal: string;
  name: string;
  panelOpenState: boolean;
  firstName: any;
  lastName: any;
  username: any;
  imagePerson: any;
  dataPerson: any;
  tags: any[];

  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.panelOpenState = false;
    this.obtainListQuestions();
    this.obtainDataPerson();
    this.listAllTags();
    // this.obtainAnswersQuestion();
  }

  logout() {
    this.router.navigate(['']);
  }

  goProfile() {
    this.router.navigate(['profile-user']);
  }

  obtainDataPerson() {
    this.dataService.getUserData(localStorage.getItem('person_id')).subscribe(
      response => {
        this.dataPerson = response.json();
        this.firstName = this.dataPerson.user.first_name;
        this.lastName = this.dataPerson.user.last_name;
        this.username = this.dataPerson.user.username;
        if (this.dataPerson.person_image === 'Sin imagen') {
          this.imagePerson = 'http://alarishealth.com/wp-content/uploads/2014/06/no-user.png';
        } else {
          this.imagePerson = 'http://' + this.dataPerson.person_image;
        }
      }
    );
  }

  goToAddQuestion() {
    this.router.navigate(['add-question']);
  }

  obtainListQuestions() {
    this.dataService.listQuestions(localStorage.getItem('person_id'), true, '').subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  orderByTags() {
    this.dataService.listQuestions(localStorage.getItem('person_id'), true, 'by_tag').subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  newestQuestions() {
    this.dataService.listQuestions(localStorage.getItem('person_id'), true, 'newest').subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  oldestQuestions() {
    this.dataService.listQuestions(localStorage.getItem('person_id'), true, 'oldest').subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  orderByLikes() {
    this.dataService.listQuestions(localStorage.getItem('person_id'), true, 'by_likes').subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  obtainAnswersQuestion(idQuestion) {
    this.dataService.getAnswers(idQuestion).subscribe(
      response => {
        this.listAnswers = response.json();
      }
    );
  }

  openDialog(idQuest): void {
    this.dialog.open(DialogAnswerComponent, {
      width: '500px',
      data: { idQuestion: idQuest }
    });
  }

  voteUpQuestion(itemQuestion) {
    this.dataService.saveLikePerson(localStorage.getItem('person_id'), itemQuestion.id, true).subscribe(
      response => {
        console.log(response.json());
        itemQuestion.has_like = response.json().id;
        itemQuestion.likes += 1;
      }
    );
  }

  voteDownQuestion(itemQuestion) {
    this.dataService.saveLikePerson(localStorage.getItem('person_id'), itemQuestion.id, false).subscribe(
      response => {
        console.log(response.json());
        itemQuestion.has_like = response.json().id;
        itemQuestion.dislikes += 1;
      }
    );
  }

  selectTag(tag) {
    this.obtainQuestionsByTag(tag.id);
  }

  listAllTags() {
    this.dataService.getTags(true).subscribe(
      response => {
        this.tags = response.json();
      }
    );
  }

  obtainQuestionsByTag(idTag) {
    this.dataService.listQuestions(localStorage.getItem('person_id'), true, 'filter_tag', idTag).subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  checkType(tags) {
    if (typeof tags !== 'string') {
      return true;
    }
    return false;
  }

}
