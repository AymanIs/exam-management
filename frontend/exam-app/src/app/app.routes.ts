import { Routes } from '@angular/router';
import { ExamListComponent } from './components/exam-list/exam-list';
import { ExamFormComponent } from './components/exam-form/exam-form';

export const routes: Routes = [
  { path: '', redirectTo: '/exams', pathMatch: 'full' },
  { path: 'exams', component: ExamListComponent },
  { path: 'new-exam', component: ExamFormComponent },
  { path: '**', redirectTo: '/exams' }
];