import { Component, inject, input, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DashboardService } from '../../../services/dashboard';
import { Widget } from '../../../models/dashboard';

@Component({
  selector: 'app-widget-options',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatButtonToggleModule],
  templateUrl: './widget-options.html',
  styleUrl: './widget-options.css',
})
export class WidgetOptionsComponent {
  showOptions = model<boolean>(false);
  data = input.required<Widget>();

  store = inject(DashboardService);
}
