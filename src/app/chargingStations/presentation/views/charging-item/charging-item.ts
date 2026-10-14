import {Component, computed, inject, viewChild, InputSignal, input} from '@angular/core';
import {Router} from '@angular/router';
import {Charging} from '../../../domain/model/charging.entity';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-charging-item',
  imports: [
    MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle,
     MatCardContent
  ],
  templateUrl: './charging-item.html',
  styleUrl: './charging-item.css'
})
export class ChargingItem {
  private snackBar = inject(MatSnackBar);
  charging: InputSignal<Charging> = input.required<Charging>();

  async shareCharging() {
    const chargingShareInfo = {
      title: this.charging()?.stationName,
      capacity: this.charging()?.maxGridKwCapacity,
      type: this.charging()?.vehicleType
    };

    if (navigator.share) {
      try {
        await navigator.share(chargingShareInfo);
        this.snackBar.open('Charging shared successfully!', 'Close', { duration: 3000 });
      } catch (error) {
        this.snackBar.open('Sharing failed.', 'Close', { duration: 3000 });
      }
    } else {
      try {
        if (chargingShareInfo.type) {
          await navigator.clipboard.writeText(chargingShareInfo.type);
          this.snackBar.open('Charging type copied to clipboard!', 'Close', { duration: 3000 });
        }
      } catch (error) {
        this.snackBar.open('Failed to copy URL.', 'Close', { duration: 3000 });
      }
    }
  }
}
