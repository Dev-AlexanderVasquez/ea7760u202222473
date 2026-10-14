import {inject, Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Vehicle} from '../domain/model/vehicle.entity';
import {HttpClient} from '@angular/common/http';
import {VehicleApiEndpoint} from './vehicle-api-endpoint';
import {Observable} from 'rxjs';

/**
 * Infrastructure facade for vehicle endpoint operations.
 */
@Injectable({providedIn: 'root'})
export class VehicleApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly vehicleEndpoint = new VehicleApiEndpoint(this.http);



  /**
   * Retrieves all vehicle stations.
   * @returns Stream with the vehicle collection.
   */
  getVehicles = (): Observable<Vehicle[]> =>
    this.vehicleEndpoint.getAll();

  /**
   * Retrieves a single vehicle station by ID.
   * @param id - The ID of the charging station.
   * @returns An Observable of the Vehicle object.
   */
  getVehicleById = (id: number): Observable<Vehicle> =>
    this.vehicleEndpoint.getById(id);

  /**
   * Creates a new charging station.
   * @param vehicle - The charging station to create.
   * @returns An Observable of the created Vehicle object.
   */
  createVehicle = (vehicle: Vehicle): Observable<Vehicle> =>
    this.vehicleEndpoint.create(vehicle);

  /**
   * Updates an existing charging station.
   * @param vehicle - The charging station to update.
   * @returns An Observable of the updated Vehicle object.
   */
  updateVehicle = (vehicle: Vehicle): Observable<Vehicle> =>
    this.vehicleEndpoint.update(vehicle, vehicle.id);

  /**
   * Deletes a vehicle station by ID.
   * @param id - The ID of the vehicle station to delete.
   * @returns An Observable of void.
   */
  deleteVehicle = (id: number): Observable<void> =>
    this.vehicleEndpoint.delete(id);
}
