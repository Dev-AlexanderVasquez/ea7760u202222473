import {Component, computed, inject, viewChild, InputSignal, input} from '@angular/core';
import {Router} from '@angular/router';
import {Charging} from '../../../domain/model/charging.entity';
import {ChargingItem} from '../charging-item/charging-item';

/**
 * Displays the category collection with table actions.
 */
@Component({
  selector: 'app-charging-list',
  imports: [
    ChargingItem
  ],
  templateUrl: './vehicle-list.html',
  styleUrl: './charging-list.css'
})
export class ChargingList {
  protected router = inject(Router);
  charging: InputSignal<Charging[]> = input.required<Array<Charging>>();
}
