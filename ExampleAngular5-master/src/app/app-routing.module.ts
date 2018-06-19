import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'list-questions',
        component: ListQuestionsComponent
    },
    {
        path: 'profile-user',
        component: ProfileUserComponent
    },
    {
        path: 'add-question',
        component: AddQuestionComponent
    },
    {
        path: 'home-page',
        component: HomePageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
