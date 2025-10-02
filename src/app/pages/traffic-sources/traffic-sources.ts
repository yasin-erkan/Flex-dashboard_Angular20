import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-traffic-sources-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './traffic-sources.html',
  styleUrls: ['./traffic-sources.css'],
})
export class TrafficSourcesPageComponent {
  displayedColumns: string[] = ['source', 'visitors', 'percentage', 'trend'];

  dataSource = [
    { source: 'Google', visitors: 12543, percentage: 45.2, trend: 'up' },
    { source: 'Facebook', visitors: 8234, percentage: 29.7, trend: 'up' },
    { source: 'Twitter', visitors: 4567, percentage: 16.5, trend: 'down' },
    { source: 'Direct', visitors: 2134, percentage: 7.7, trend: 'up' },
    { source: 'YouTube', visitors: 987, percentage: 3.6, trend: 'up' },
    { source: 'Instagram', visitors: 2341, percentage: 8.4, trend: 'up' },
    { source: 'LinkedIn', visitors: 1456, percentage: 5.2, trend: 'down' },
    { source: 'Reddit', visitors: 789, percentage: 2.8, trend: 'up' },
    { source: 'Pinterest', visitors: 567, percentage: 2.0, trend: 'down' },
    { source: 'TikTok', visitors: 1234, percentage: 4.4, trend: 'up' },
  ];

  getTrendIcon(trend: string): string {
    return trend === 'up' ? 'trending_up' : 'trending_down';
  }

  getTrendColor(trend: string): string {
    return trend === 'up' ? '#4caf50' : '#f44336';
  }
}
