import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../../../services/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traffic-sources',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './traffic-sources.html',
  styleUrls: ['./traffic-sources.css'],
})
export class TrafficSourcesComponent {
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  private readonly widgetId = 6;

  displayedColumns: string[] = ['source', 'visitors', 'percentage', 'trend'];

  dataSource = [
    { source: 'Search', visitors: 12543, percentage: 45.2, trend: 'up' },
    { source: 'Suggested', visitors: 8234, percentage: 29.7, trend: 'up' },
    { source: 'Direct', visitors: 2134, percentage: 12.5, trend: 'up' },
    { source: 'External', visitors: 1456, percentage: 8.3, trend: 'down' },
    { source: 'Browse Features', visitors: 987, percentage: 4.3, trend: 'up' },
  ];

  getTrendIcon(trend: string): string {
    return trend === 'up' ? 'trending_up' : 'trending_down';
  }

  getTrendColor(trend: string): string {
    return trend === 'up' ? '#4caf50' : '#f44336';
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

  onViewAllSources() {
    this.router.navigate(['/traffic-sources']);
  }
}
