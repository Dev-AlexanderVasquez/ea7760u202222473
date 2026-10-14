import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a vehicle.
 */
export interface VehicleResource extends BaseResource {
  /**
   * The unique identifier for the vehicle.
   */
  id: number;
  stationId: string;
  vehicleType: string;
  makeId: number;
  makeName: string;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: string;

}

/**
 * Response envelope for vehicles collection queries.
 */
export interface VehicleResponse extends BaseResponse {
  /**
   * The list of vehicles returned by the API.
   */
  vehicle: VehicleResource[];
}
