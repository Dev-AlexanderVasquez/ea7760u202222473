import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Charging} from '../domain/model/charging.entity';
import {ChargingResponse, ChargingResource} from './charging-response';

/**
 * Maps charging entities to and from API resources.
 */
export class ChargingAssembler implements BaseAssembler<Charging, ChargingResource, ChargingResponse> {

  /**
   * Converts a VehicleResponse to an array of Charging entities.
   * @param response - The API response containing charging stations.
   * @returns An array of Charging entities.
   */
  toEntitiesFromResponse = (response: ChargingResponse): Charging[] =>
    response.categories.map(resource => this.toEntityFromResource(resource as ChargingResource));

  /**
   * Converts a ChargingResource to a Charging entity.
   * @param resource - The resource to convert.
   * @returns The converted Charging entity.
   */
  toEntityFromResource = (resource: ChargingResource): Charging =>
    new Charging(
      resource.id,
      resource.stationName,
      resource.vehicleType,
      resource.maxGridKwCapacity,
      resource.stallsAvailable,
      resource.isActive,
      resource.locationCoordinates
    );

  /**
   * Converts a Charging entity to a ChargingResource.
   * @param entity - The entity to convert.
   * @returns The converted ChargingResource.
   */
  toResourceFromEntity = (entity: Charging): ChargingResource =>
    ({
      id: entity.id,
      stationName: entity.stationName,
      vehicleType: entity.vehicleType,
      maxGridKwCapacity: entity.maxGridKwCapacity,
      stallsAvailable: entity.stallsAvailable,
      isActive: entity.isActive,
      locationCoordinates: entity.locationCoordinates
    } as ChargingResource);


}
