import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Vehicle} from '../domain/model/vehicle.entity';
import {VehicleResponse, VehicleResource} from './vehicle-response';

/**
 * Maps vehicle entities to and from API resources.
 */
export class VehicleAssembler implements BaseAssembler<Vehicle, VehicleResource, VehicleResponse> {

  /**
   * Converts a VehicleResponse to an array of Vehicle entities.
   * @param response - The API response containing vehicles.
   * @returns An array of Vehicle entities.
   */
  toEntitiesFromResponse = (response: VehicleResponse): Vehicle[] =>
    response.vehicle.map(resource => this.toEntityFromResource(resource as VehicleResource));

  /**
   * Converts a VehicleResource to a Vehicle entity.
   * @param resource - The resource to convert.
   * @returns The converted Vehicle entity.
   */
  toEntityFromResource = (resource: VehicleResource): Vehicle =>
    new Vehicle(
      resource.id,
      resource.stationId,
      resource.vehicleType,
      resource.makeId,
      resource.makeName,
      resource.kwDemand,
      resource.chargingPortType,
      resource.isFastCharge,
      resource.registeredAt
    );

  /**
   * Converts a Vehicle entity to a VehicleResource.
   * @param entity - The entity to convert.
   * @returns The converted VehicleResource.
   */
  toResourceFromEntity = (entity: Vehicle): VehicleResource =>
    ({
      id: entity.id,
      stationId: entity.stationId,
      vehicleType: entity.vehicleType,
      makeId: entity.makeId,
      makeName: entity.makeName,
      kwDemand: entity.kwDemand,
      chargingPortType: entity.chargingPortType,
      isFastCharge: entity.isFastCharge,
      registeredAt: entity.registeredAt
    } as VehicleResource);


}
