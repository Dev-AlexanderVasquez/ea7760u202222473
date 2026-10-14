import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a charging station.
 */
export interface ChargingResource extends BaseResource {
  /**
   * The unique identifier for the charging station.
   */
  id: number;
  stationName: string;
  vehicleType: string;
  maxGridKwCapacity: number;
  stallsAvailable: number;
  isActive: boolean;
  locationCoordinates: { latitude: number; longitude: number; };

}

/**
 * Response envelope for charging station collection queries.
 */
export interface ChargingResponse extends BaseResponse {
  /**
   * The list of charging stations returned by the API.
   */
  categories: ChargingResource[];
}
