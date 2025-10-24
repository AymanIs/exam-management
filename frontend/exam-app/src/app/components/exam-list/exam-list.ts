import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExamService } from '../../services/exam';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-list.html',
  styleUrl: './exam-list.css'
})
export class ExamListComponent implements OnInit {
  exams: Exam[] = [];
  loading = false;
  error = '';

  constructor(
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.loading = true;
    this.examService.getExams().subscribe({
      next: (data) => {
        this.exams = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des examens';
        this.loading = false;
        console.error(err);
      }
    });
  }

  navigateToNewExam(): void {
    this.router.navigate(['/new-exam']);
  }

  shouldShowEnAttente(exam: Exam): boolean {
    return exam.status === 'Recherche de place' ;
  }
  displayMeetingPoint(exam: Exam): string {
    if (this.shouldShowEnAttente(exam)) {
      return 'En attente';
    }
    return exam.meeting_point?.trim() || 'En attente';
  }

  displayDate(exam: Exam): string {
    if (this.shouldShowEnAttente(exam)) {
      return 'En attente';
    }
    if (!exam.date) {
      return 'En attente';
    }
    const date = new Date(exam.date);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short'
    });
  }

  displayTime(exam: Exam): string {
    if (this.shouldShowEnAttente(exam)) {
      return 'En attente';
    }
    if (!exam.date) {
      return 'En attente';
    }
    const date = new Date(exam.date);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit',
      minute: '2-digit'
    }) + 'h';
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Confirmé': return 'status-confirmed';
      case 'A organiser': return 'status-to-organize';
      case 'Recherche de place': return 'status-searching';
      case 'Annulé': return 'status-cancelled';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'Confirmé': return '✓';
      case 'A organiser': return '▲';
      case 'Recherche de place': return '⚑';
      case 'Annulé': return '✕';
      default: return '';
    }
  }

  getExamCount(): number {
    return this.exams.length;
  }
}