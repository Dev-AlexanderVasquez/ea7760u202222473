import {Routes} from '@angular/router';

const vehicleList = () => import('./views/vehicle-list/vehicle-list').then(m => m.VehicleList);


/**
 * Route tree for learning presentation views.
 */
export const VehicleRoutes: Routes = [
  { path: 'vehicle',  loadComponent: vehicleList }
];
