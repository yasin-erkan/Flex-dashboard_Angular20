import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../services/dashboard';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css'],
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | null = null;
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  //
  private readonly widgetId = 5;

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    }, 200);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart() {
    if (!this.chartRef?.nativeElement) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
          {
            label: 'Views',
            data: [100, 102, 105, 110, 115, 120],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#6366f1',
            borderWidth: 1,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            display: true,
            grid: { display: false },
            ticks: {
              color: '#6b7280',
              font: { size: 12, weight: 'normal' },
            },
          },
          y: {
            display: true,
            beginAtZero: false,
            min: 95,
            max: 125,
            grid: {
              color: 'rgba(107, 114, 128, 0.1)',
            },
            ticks: {
              color: '#6b7280',
              font: { size: 12, weight: 'normal' },
              stepSize: 5,
            },
          },
        },
        layout: {
          padding: { top: 20, bottom: 20, left: 20, right: 20 },
        },
      },
    });
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

  onGoToAnalytics() {
    this.router.navigate(['/analytics']);
  }
}
