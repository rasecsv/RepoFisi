import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { DataService } from './../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  firstName: any;
  lastName: any;
  username: any;
  imagePerson: any;
  numQuestions: any;
  dataPerson: any;
  listQuestions: any[];
  tags: any[];
  test: any = 2;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    private router: Router
  ) {
    this.obtainDataPerson();
    this.obtainListQuestions();
    this.listAllTags();
  }

  ngOnInit() {
  }


  obtainDataPerson() {
    this.dataService.getUserData(localStorage.getItem('person_id')).subscribe(
      response => {
        this.dataPerson = response.json();
        this.firstName = this.dataPerson.user.first_name;
        this.lastName = this.dataPerson.user.last_name;
        this.numQuestions = this.dataPerson.num_questions;
        this.username = this.dataPerson.user.username;
        if (this.dataPerson.person_image === 'Sin imagen') {
          this.imagePerson = 'http://alarishealth.com/wp-content/uploads/2014/06/no-user.png';
        } else {
          this.imagePerson = 'http://' + this.dataPerson.person_image;
        }
      }
    );
  }

  goListQuestions() {
    this.router.navigate(['list-questions']);
  }

  obtainListQuestions() {
    this.dataService.listQuestions(null, false, 'last_questions').subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  listAllTags() {
    this.dataService.getTags(true).subscribe(
      response => {
        this.tags = response.json();
      }
    );
  }

  goFisiPage() {
    window.location.href = 'http://sistemas.unmsm.edu.pe/';
  }

}
