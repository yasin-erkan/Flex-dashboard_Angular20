import { Component, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Widget } from '../../models/dashboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WidgetOptionsComponent } from './widget-options/widget-options';
import { CdkDrag, CdkDragPlaceholder, CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    NgComponentOutlet,
    MatButtonModule,
    MatIcon,
    WidgetOptionsComponent,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDragHandle,
  ],
  templateUrl: './widget.html',
  styleUrl: './widget.css',
  host: {
    '[style.grid-area]': "'span ' + (data().rows ?? 1) + ' / span ' + (data().columns ?? 1)",
  },
})
export class WidgetComponent {
  data = input.required<Widget>();

  showOptions = signal(false);
}
