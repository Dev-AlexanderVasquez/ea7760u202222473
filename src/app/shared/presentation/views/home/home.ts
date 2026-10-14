import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ChargingList} from '../../../../chargingStations/presentation/views/charging-list/charging-list';
import {ChargingStore} from '../../../../chargingStations/application/charging.store';

/**
 * Home view for the shared presentation context.
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, ChargingList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly chargingStore = inject(ChargingStore);
}
