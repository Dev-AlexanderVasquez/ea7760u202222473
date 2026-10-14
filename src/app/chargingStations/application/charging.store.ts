import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {Charging} from '../domain/model/charging.entity';
import {ChargingApi} from '../infrastructure/charging-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';


/**
 * Holds learning application state and coordinates course/category application layer behavior.
 */
@Injectable({
  providedIn: 'root'
})
export class ChargingStore {
  private readonly chargingApi = inject(ChargingApi);

  /**
   * Computed signal for the count of charging stations.
   */
  readonly chargingCount = computed(() => this.charging().length);


  private readonly chargingSignal = signal<Charging[]>([]);

  /**
   * Readonly signal for the list of charging stations.
   */
  readonly charging = this.chargingSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  /**
   * Readonly signal indicating if data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  /**
   * Readonly signal for the current error message.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates an instance of ChargingStore and loads initial data.
   */
  constructor() {
    this.loadCharging();
  }

  /**
   * Selects a category by identifier.
   * @param id - Category identifier.
   * @returns Reactive selection for the requested category.
   */
  getChargingById = (id: number): Signal<Charging | undefined> =>
    computed(() => id ? this.charging().find(c => c.id === id) : undefined);

  /**
   * Adds a new charging station.
   * @param charging - The charging station to add.
   */
  addCharging = (charging: Charging): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.chargingApi.createCharging(charging).pipe(retry(2)).subscribe({
      next: createdCharging => {
        this.chargingSignal.update(charging => [...charging, createdCharging]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create charging station'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing charging station.
   * @param updatedCharging - The charging station to update.
   */
  updateCharging = (updatedCharging: Charging): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.chargingApi.updateCharging(updatedCharging).pipe(retry(2)).subscribe({
      next: (safeCharging) => {
        this.chargingSignal.update(charging =>
          charging.map(c => c.id === safeCharging.id ? safeCharging : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update charging station'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a charging station by ID.
   * @param id - The ID of the charging station to delete.
   */
  deleteCharging = (id: number): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.chargingApi.deleteCharging(id).pipe(retry(2)).subscribe({
      next: () => {
        this.chargingSignal.update(charging => charging.filter(c => c.id !== id));
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete charging station'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all charging stations from the API.
   */
  private loadCharging = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.chargingApi.getCharging().pipe(takeUntilDestroyed()).subscribe({
      next: charging => {
        this.chargingSignal.set(charging);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load charging stations'));
        this.loadingSignal.set(false);
      }
    });
  }


  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
