import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../components/widget/widget';
import { DashboardService } from '../../services/dashboard';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Widget } from '../../models/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WidgetComponent,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CdkDropList,
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  store = inject(DashboardService);

  drop(event: CdkDragDrop<Widget[]>) {
    if (event.previousIndex !== event.currentIndex) {
      this.store.moveWidget(event.previousIndex, event.currentIndex);
    }
  }
}
