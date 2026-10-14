import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Charging} from '../domain/model/charging.entity';
import {ChargingResponse, ChargingResource} from './charging-response';
import {ChargingAssembler} from './charging-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


/**
 * Endpoint client for charging station CRUD operations.
 */
export class ChargingApiEndpoint extends BaseApiEndpoint<Charging, ChargingResource, ChargingResponse, ChargingAssembler> {
  /**
   * Creates an instance of VehicleApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderChargingEndpointPath}`, new ChargingAssembler());
  }
}
