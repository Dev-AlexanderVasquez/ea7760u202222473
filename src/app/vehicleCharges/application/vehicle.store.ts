import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {Vehicle} from '../domain/model/vehicle.entity';
import {VehicleApi} from '../infrastructure/vehicle-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';


/**
 * Holds learning application state and coordinates course/category application layer behavior.
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleStore {
  private readonly vehicleApi = inject(VehicleApi);

  /**
   * Computed signal for the count of vehicle stations.
   */
  readonly vehicleCount = computed(() => this.vehicle().length);


  private readonly vehicleSignal = signal<Vehicle[]>([]);

  /**
   * Readonly signal for the list of vehicle stations.
   */
  readonly vehicle = this.vehicleSignal.asReadonly();

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
   * Creates an instance of VehicleStore and loads initial data.
   */
  constructor() {
    this.loadVehicles();
  }

  /**
   * Selects a vehicle by identifier.
   * @param id - vehicle identifier.
   * @returns Reactive selection for the requested vehicle.
   */
  getVehicleById = (id: number): Signal<Vehicle | undefined> =>
    computed(() => id ? this.vehicle().find(c => c.id === id) : undefined);

  /**
   * Adds a new vehicle.
   * @param vehicle - The vehicle to add.
   */
  addVehicle = (vehicle: Vehicle): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.vehicleApi.createVehicle(vehicle).pipe(retry(2)).subscribe({
      next: createdVehicle => {
        this.vehicleSignal.update(vehicles => [...vehicles, createdVehicle]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create vehicle'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Updates an existing vehicle station.
   * @param updatedVehicle - The vehicle station to update.
   */
  updateVehicle = (updatedVehicle: Vehicle): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.vehicleApi.updateVehicle(updatedVehicle).pipe(retry(2)).subscribe({
      next: (safeVehicle) => {
        this.vehicleSignal.update(vehicles =>
          vehicles.map(c => c.id === safeVehicle.id ? safeVehicle : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update vehicle'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Deletes a vehicle by ID.
   * @param id - The ID of the vehicle to delete.
   */
  deleteVehicle = (id: number): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.vehicleApi.deleteVehicle(id).pipe(retry(2)).subscribe({
      next: () => {
        this.vehicleSignal.update(vehicles => vehicles.filter(c => c.id !== id));
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete vehicle'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads all vehicles from the API.
   */
  private loadVehicles = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.vehicleApi.getVehicles().pipe(takeUntilDestroyed()).subscribe({
      next: vehicles => {
        this.vehicleSignal.set(vehicles);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load vehicles'));
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
