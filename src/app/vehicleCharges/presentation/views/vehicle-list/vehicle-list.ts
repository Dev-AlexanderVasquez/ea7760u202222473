import {Component, computed, inject, viewChild} from '@angular/core';
import {Router} from '@angular/router';
import {VehicleStore} from '../../../application/vehicle.store';
import {MatError} from '@angular/material/form-field';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

/**
 * Displays the category collection with table actions.
 */
@Component({
  selector: 'app-vehicle-list',
  imports: [
    MatError,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatProgressSpinner,
    TranslatePipe,
    MatIcon,
    MatIconButton,
    MatSort,
    MatSortHeader,
    MatPaginator
  ],
  templateUrl: './vehicle-list.html',
  styleUrl: './charging-list.css'
})
export class VehicleList {
  protected router = inject(Router);
  readonly store = inject(VehicleStore);


  /**
   * Columns to display in the table.
   */
  displayedColumns: string[] = ['id', 'makeId','makeName', 'chargingPortType', 'isFastCharge', 'actions'];

  readonly sort = viewChild(MatSort);
  readonly paginator = viewChild(MatPaginator);

  /**
   * Computed data source for the table.
   */
  readonly dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.vehicle());
    const sort = this.sort();
    if (sort) {
      source.sort = sort;
    }
    const paginator = this.paginator();
    if (paginator) {
      source.paginator = paginator;
    }
    return source;
  });

  /**
   * Navigates to the edit page for a vehicle.
   * @param id - The ID of the vehicle to edit.
   */
  editVehicle(id: number) {
    this.router.navigate(['vehicle', id, 'edit']).then();
  }

  /**
   * Deletes a vehicle by ID.
   * @param id - The ID of the vehicle to delete.
   */
  deleteVehicle(id: number) {
    this.store.deleteVehicle(id);
  }

  /**
   * Navigates to the new vehicle form.
   */
  navigateToNew() {
    this.router.navigate(['vehicle/new']).then();
  }
}
