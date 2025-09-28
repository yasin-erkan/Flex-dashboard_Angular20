import { computed, Injectable, signal } from '@angular/core';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers';
import { Widget } from '../models/dashboard';
import { ViewsComponent } from '../pages/dashboard/widgets/views';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  widgets = signal<Widget[]>([
    { id: 1, label: ' Subscribers', content: SubscribersComponent },
    { id: 2, label: ' Views', content: ViewsComponent },
  ]);

  addedWidgets = signal<Widget[]>([
    { id: 1, label: ' Subscribers', content: SubscribersComponent, rows: 2, columns: 2 },
    { id: 2, label: ' Views', content: ViewsComponent, rows: 2, columns: 2 },
  ]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((widget) => widget.id);
    return this.widgets().filter((widget) => !addedIds.includes(widget.id));
  });

  addWidget(widget: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...widget }]);
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget } as Widget;
      this.addedWidgets.set(newWidgets);
    }
  }
  moveWidgetRight(id: number) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index === this.addedWidgets().length - 1) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [newWidgets[index + 1], newWidgets[index]];
    this.addedWidgets.set(newWidgets);
  }

  moveWidgetLeft(id: number) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index === 0) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [newWidgets[index - 1], newWidgets[index]];
    this.addedWidgets.set(newWidgets);
  }





  
  constructor() {}
}
