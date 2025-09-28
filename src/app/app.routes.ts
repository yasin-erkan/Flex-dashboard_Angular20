import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ContentComponent } from './pages/content/content';
import { AnalyticsComponent } from './pages/analytics/analytics';
import { CommentsComponent } from './pages/comments/comments';

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
    component: AnalyticsComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
];
