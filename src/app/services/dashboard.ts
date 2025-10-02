import { computed, effect, Injectable, signal } from '@angular/core';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers';
import { Widget } from '../models/dashboard';
import { ViewsComponent } from '../pages/dashboard/widgets/views';
import { WatchTimeComponent } from '../pages/dashboard/widgets/watch-time';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue';
import { AnalyticsComponent } from '../pages/dashboard/widgets/analytics';
import { TrafficSourcesComponent } from '../pages/dashboard/widgets/traffic-sources';
import { LatestCommentsComponent } from '../pages/dashboard/widgets/latest-comments';

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
    {
      id: 5,
      label: ' Channel Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 2,
    },
    {
      id: 6,
      label: ' Traffic Sources',
      content: TrafficSourcesComponent,
      rows: 2,
      columns: 1,
    },
    {
      id: 7,
      label: ' Latest Comments',
      content: LatestCommentsComponent,
      rows: 2,
      columns: 1,
    },
  ]);

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((widget) => widget.id);
    return this.widgets().filter((widget) => !addedIds.includes(widget.id));
  });

  fetchWidgets() {
    // Load widgets from localStorage
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    if (savedWidgets) {
      try {
        const widgets = JSON.parse(savedWidgets);
        // Restore content property for each widget
        const widgetsWithContent = widgets.map((savedWidget: any) => {
          const originalWidget = this.widgets().find((w) => w.id === savedWidget.id);
          return {
            ...savedWidget,
            content: originalWidget?.content,
          };
        });
        this.addedWidgets.set(widgetsWithContent);
      } catch (error) {
        console.error('Error loading widgets from localStorage:', error);
        this.addedWidgets.set([]);
      }
    } else {
      this.addedWidgets.set([]);
    }
  }

  addWidget(widget: Widget) {
    const newWidgets = [...this.addedWidgets(), { ...widget }];
    this.addedWidgets.set(newWidgets);
    this.saveToLocalStorage(newWidgets);
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget } as Widget;
      this.addedWidgets.set(newWidgets);
      this.saveToLocalStorage(newWidgets);
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
    this.saveToLocalStorage(newWidgets);
  }

  moveWidgetLeft(id: number) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index === 0) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [newWidgets[index - 1], newWidgets[index]];
    this.addedWidgets.set(newWidgets);
    this.saveToLocalStorage(newWidgets);
  }
  removeWidget(id: number) {
    const newWidgets = this.addedWidgets().filter((widget) => widget.id !== id);
    this.addedWidgets.set(newWidgets);
    this.saveToLocalStorage(newWidgets);
  }
  moveWidget(fromIndex: number, toIndex: number) {
    const widgets = [...this.addedWidgets()];
    const widget = widgets.splice(fromIndex, 1)[0];
    widgets.splice(toIndex, 0, widget);
    this.addedWidgets.set(widgets);
    this.saveToLocalStorage(widgets);
  }

  private saveToLocalStorage(widgets: Widget[]) {
    try {
      localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
    } catch (error) {
      console.error('Error saving widgets to localStorage:', error);
    }
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
