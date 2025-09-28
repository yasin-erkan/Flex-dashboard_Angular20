import { Component, ElementRef, inject, viewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../components/widget/widget';
import { DashboardService } from '../../services/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WidgetComponent, MatIconModule, MatButtonModule, MatMenuModule],
  providers: [DashboardService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  store = inject(DashboardService);
  dashboard = viewChild.required<ElementRef>('dashboard');
  ngOnInit() {
    wrapGrid(this.dashboard().nativeElement, {
      duration: 300,
    });
  }
}
