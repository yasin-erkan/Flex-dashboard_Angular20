import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ContentComponent } from './pages/content/content';
import { AnalyticsComponent } from './pages/dashboard/widgets/analytics';
import { AnalyticsPageComponent } from './pages/analytics/analytics';
import { CommentsComponent } from './pages/comments/comments';
import { TrafficSourcesPageComponent } from './pages/traffic-sources/traffic-sources';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'content',
    component: ContentComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsPageComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
  {
    path: 'traffic-sources',
    component: TrafficSourcesPageComponent,
  },
];
