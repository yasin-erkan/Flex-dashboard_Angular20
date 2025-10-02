import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../../../services/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-comments',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './latest-comments.html',
  styleUrls: ['./latest-comments.css'],
})
export class LatestCommentsComponent {
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  private readonly widgetId = 7;

  comments = [
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'SJ',
      comment: 'Great content! Really helpful tutorial.',
      video: 'How to Build React Apps',
      time: '2h ago',
      likes: 12,
      isPositive: true,
    },
    {
      id: 2,
      user: 'Mike Chen',
      avatar: 'MC',
      comment: 'Could you explain the advanced concepts?',
      video: 'Advanced JavaScript Patterns',
      time: '4h ago',
      likes: 8,
      isPositive: false,
    },
    {
      id: 3,
      user: 'Emma Wilson',
      avatar: 'EW',
      comment: 'Amazing work! Keep it up!',
      video: 'CSS Grid Masterclass',
      time: '6h ago',
      likes: 15,
      isPositive: true,
    },
    {
      id: 4,
      user: 'David Brown',
      avatar: 'DB',
      comment: 'This helped me solve my problem.',
      video: 'Node.js Best Practices',
      time: '8h ago',
      likes: 6,
      isPositive: true,
    },
    {
      id: 5,
      user: 'Lisa Garcia',
      avatar: 'LG',
      comment: 'Need more examples please.',
      video: 'TypeScript Fundamentals',
      time: '10h ago',
      likes: 4,
      isPositive: false,
    },
  ];

  getSentimentIcon(isPositive: boolean): string {
    return isPositive ? 'sentiment_very_satisfied' : 'sentiment_neutral';
  }

  getSentimentColor(isPositive: boolean): string {
    return isPositive ? '#4caf50' : '#ff9800';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  // Dashboard service'i kullanarak widget işlevleri
  updateColumns(columns: number) {
    this.dashboardService.updateWidget(this.widgetId, { columns });
  }

  updateRows(rows: number) {
    this.dashboardService.updateWidget(this.widgetId, { rows });
  }

  moveLeft() {
    this.dashboardService.moveWidgetLeft(this.widgetId);
  }

  moveRight() {
    this.dashboardService.moveWidgetRight(this.widgetId);
  }

  removeWidget() {
    this.dashboardService.removeWidget(this.widgetId);
  }

  onViewAllComments() {
    this.router.navigate(['/comments']);
  }
}
