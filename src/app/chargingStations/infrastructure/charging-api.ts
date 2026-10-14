import {inject, Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Charging} from '../domain/model/charging.entity';
import {HttpClient} from '@angular/common/http';
import {ChargingApiEndpoint} from './charging-api-endpoint';
import {Observable} from 'rxjs';

/**
 * Infrastructure facade for course and category endpoint operations.
 */
@Injectable({providedIn: 'root'})
export class ChargingApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly chargingEndpoint = new ChargingApiEndpoint(this.http);



  /**
   * Retrieves all charging stations.
   * @returns Stream with the charging station collection.
   */
  getCharging = (): Observable<Charging[]> =>
    this.chargingEndpoint.getAll();

  /**
   * Retrieves a single charging station by ID.
   * @param id - The ID of the charging station.
   * @returns An Observable of the Charging object.
   */
  getChargingById = (id: number): Observable<Charging> =>
    this.chargingEndpoint.getById(id);

  /**
   * Creates a new charging station.
   * @param charging - The charging station to create.
   * @returns An Observable of the created Charging object.
   */
  createCharging = (charging: Charging): Observable<Charging> =>
    this.chargingEndpoint.create(charging);

  /**
   * Updates an existing charging station.
   * @param charging - The charging station to update.
   * @returns An Observable of the updated Charging object.
   */
  updateCharging = (charging: Charging): Observable<Charging> =>
    this.chargingEndpoint.update(charging, charging.id);

  /**
   * Deletes a charging station by ID.
   * @param id - The ID of the charging station to delete.
   * @returns An Observable of void.
   */
  deleteCharging = (id: number): Observable<void> =>
    this.chargingEndpoint.delete(id);
}
