import { Component, inject } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget';
import { DashboardService } from '../../services/dashboard';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, MatIcon, MatButton, MatButtonModule, MatMenuModule],
  providers: [DashboardService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  store = inject(DashboardService);
}
