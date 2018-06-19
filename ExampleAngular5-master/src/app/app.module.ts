import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { DialogAnswerComponent } from './dialog-answer/dialog-answer.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListQuestionsComponent,
    ProfileUserComponent,
    AddQuestionComponent,
    DialogAnswerComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [DialogAnswerComponent]
})
export class AppModule { }
