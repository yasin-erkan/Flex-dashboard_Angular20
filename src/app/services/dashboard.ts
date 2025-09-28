import { computed, effect, Injectable, signal } from '@angular/core';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers';
import { Widget } from '../models/dashboard';
import { ViewsComponent } from '../pages/dashboard/widgets/views';
import { WatchTimeComponent } from '../pages/dashboard/widgets/watch-time';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: ' Subscribers',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#58508d',
      textColor: 'whitesmoke',
    },
    {
      id: 2,
      label: ' Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#58508d',
      textColor: 'whitesmoke',
    },
    {
      id: 3,
      label: ' Watch Time',
      content: WatchTimeComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#58508d',
      textColor: 'whitesmoke',
    },
    {
      id: 4,
      label: ' Revenue',
      content: RevenueComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#58508d',
      textColor: 'whitesmoke',
    },
  ]);

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((widget) => widget.id);
    return this.widgets().filter((widget) => !addedIds.includes(widget.id));
  });

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];

      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });
      this.addedWidgets.set(widgets);
    }
  }

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
  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter((widget) => widget.id !== id));
  }

  constructor() {
    this.fetchWidgets();
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map((widget) => ({
      ...widget,
    }));
    widgetsWithoutContent.forEach((widget) => {
      delete widget.content;
    });
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetsWithoutContent));
  });
}
