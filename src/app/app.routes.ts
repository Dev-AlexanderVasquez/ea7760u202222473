import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const chargingRoutes = () => import('./chargingStations/presentation/charging.routes').then(m => m.ChargingRoutes);
const vehicleRoutes = () => import('./vehicleCharges/presentation/vehicle.routes').then(m => m.VehicleRoutes);
const baseTitle = 'Tesla Supercharger & Fleet\n' +
    '      Platform';

export const routes: Routes = [
    { path: 'home',     component:      Home,                         title: `${baseTitle} - Home`  },
    { path: 'charging', loadChildren:  chargingRoutes},
    { path: 'vehicle',  loadChildren:  vehicleRoutes},
    { path: '',         redirectTo:     '/home', pathMatch: 'full'  },
    { path: '**',       loadComponent:  pageNotFound,                 title: `${baseTitle} - Page Not Found`  },
];
