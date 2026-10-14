import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {isActive} from "@angular/router";


export class Vehicle implements BaseEntity {

    #id: number;
    #stationId: string;
    #vehicleType: string;
    #makeId: number;
    #makeName: string;
    #kwDemand: number;
    #chargingPortType: string;
    #isFastCharge: boolean;
    #registeredAt: string;


    constructor(id: number, stationId: string, vehicleType: string, makeId: number, makeName: string, kwDemand: number, chargingPortType: string, isFastCharge: boolean, registeredAt: string) {
        this.#id = id;
        this.#stationId = stationId;
        this.#vehicleType = vehicleType;
        this.#makeId = makeId;
        this.#makeName = makeName;
        this.#kwDemand = kwDemand;
        this.#chargingPortType = chargingPortType;
        this.#isFastCharge = isFastCharge;
        this.#registeredAt = registeredAt;
    }


    get id(): number {
        return this.#id;
    }

    set id(value: number) {
        this.#id = value;
    }

    get stationId(): string {
        return this.#stationId;
    }

    set stationId(value: string) {
        this.#stationId = value;
    }

    get vehicleType(): string {
        return this.#vehicleType;
    }

    set vehicleType(value: string) {
        this.#vehicleType = value;
    }

    get makeId(): number {
        return this.#makeId;
    }

    set makeId(value: number) {
        this.#makeId = value;
    }

    get makeName(): string {
        return this.#makeName;
    }

    set makeName(value: string) {
        this.#makeName = value;
    }

    get kwDemand(): number {
        return this.#kwDemand;
    }

    set kwDemand(value: number) {
        this.#kwDemand = value;
    }

    get chargingPortType(): string {
        return this.#chargingPortType;
    }

    set chargingPortType(value: string) {
        this.#chargingPortType = value;
    }

    get isFastCharge(): boolean {
        return this.#isFastCharge;
    }

    set isFastCharge(value: boolean) {
        this.#isFastCharge = value;
    }

    get registeredAt(): string {
        return this.#registeredAt;
    }

    set registeredAt(value: string) {
        this.#registeredAt = value;
    }
}
