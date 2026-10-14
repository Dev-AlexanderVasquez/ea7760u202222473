import {Routes} from '@angular/router';

const chargingList = () => import('./views/charging-list/charging-list').then(m => m.ChargingList);


/**
 * Route tree for learning presentation views.
 */
export const ChargingRoutes: Routes = [
  { path: 'charging',  loadComponent: chargingList }
];
