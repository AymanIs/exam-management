import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../services/exam';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-form.html',
  styleUrl: './exam-form.css'
})
export class ExamFormComponent {
  exam: Exam = {
    student: {
      first_name: '',
      last_name: ''
    },
    meeting_point: '',
    date: '',
    status: 'A organiser'
  };

  statuses = ['A organiser', 'Annulé', 'Recherche de place', 'Confirmé'];
  submitting = false;
  error = '';
  success = false;

  constructor(
    private examService: ExamService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitting = true;
      this.error = '';
      
      this.examService.createExam(this.exam).subscribe({
        next: (response) => {
          this.success = true;
          this.submitting = false;
          setTimeout(() => {
            this.router.navigate(['/exams']);
          }, 1500);
        },
        error: (err) => {
          this.error = 'Erreur lors de la création de l\'examen';
          this.submitting = false;
          console.error(err);
        }
      });
    }
  }

  isFormValid(): boolean {
    return !!(
      this.exam.student.first_name.trim() &&
      this.exam.student.last_name.trim() &&
      this.exam.meeting_point.trim() &&
      this.exam.date
    );
  }

  cancel(): void {
    this.router.navigate(['/exams']);
  }
}