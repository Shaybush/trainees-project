import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/data-view/data-view.component').then(
        c => c.DataViewComponent,
      ),
  },
  {
    path: 'analysis',
    loadComponent: () =>
      import('./views/analysis-view/analysis-view.component').then(
        c => c.AnalysisViewComponent,
      ),
  },
  {
    path: 'monitor',
    loadComponent: () =>
      import('./views/monitor-view/monitor-view.component').then(
        c => c.MonitorViewComponent,
      ),
  },
];
