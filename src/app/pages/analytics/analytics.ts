import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css'],
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chart', { static: true }) chartRef: any;
  private chart: Chart | null = null;
  private isDestroyed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Chart initialization will be done in AfterViewInit
  }

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart() {
    if (this.isDestroyed || !this.chartRef) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
          {
            label: 'Channel Analytics',
            data: [100, 102, 106, 110, 115, 120],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#6366f1',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 12,
                weight: 'normal',
              },
            },
          },
          y: {
            beginAtZero: false,
            min: 95,
            max: 125,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 12,
                weight: 'normal',
              },
            },
          },
        },
        layout: {
          padding: 20,
        },
      },
    };

    this.chart = new Chart(ctx, config);
    this.cdr.detectChanges();
  }
}
