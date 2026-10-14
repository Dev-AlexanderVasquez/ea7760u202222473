import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Vehicle} from '../domain/model/vehicle.entity';
import {VehicleResponse, VehicleResource} from './vehicle-response';
import {VehicleAssembler} from './vehicle-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


/**
 * Endpoint client for vehicle CRUD operations.
 */
export class VehicleApiEndpoint extends BaseApiEndpoint<Vehicle, VehicleResource, VehicleResponse, VehicleAssembler> {
  /**
   * Creates an instance of VehicleApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderVehicleEndpointPath}`, new VehicleAssembler());
  }
}
