import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {isActive} from "@angular/router";


export class Charging implements BaseEntity {

    #id: number;
    #stationName: string;
    #vehicleType: string;
    #maxGridKwCapacity: number;
    #stallsAvailable: number;
    #isActive: boolean;
    #locationCoordinates: { latitude: number; longitude: number; };




    constructor(id: number, stationName: string, vehicleType: string, maxGridKwCapacity: number, stallsAvailable: number, isActive: boolean, locationCoordinates: { latitude: number; longitude: number; }) {
        this.#id = id;
        this.#stationName = stationName;
        this.#vehicleType = vehicleType;
        this.#maxGridKwCapacity = maxGridKwCapacity;
        this.#stallsAvailable = stallsAvailable;
        this.#isActive = isActive;
        this.#locationCoordinates = locationCoordinates;

    }


    get id(): number {
        return this.#id;
    }

    set id(value: number) {
        this.#id = value;
    }

    get stationName(): string {
        return this.#stationName;
    }

    set stationName(value: string) {
        this.#stationName = value;
    }

    get vehicleType(): string {
        return this.#vehicleType;
    }

    set vehicleType(value: string) {
        this.#vehicleType = value;
    }

    get maxGridKwCapacity(): number {
        return this.#maxGridKwCapacity;
    }

    set maxGridKwCapacity(value: number) {
        this.#maxGridKwCapacity = value;
    }

    get stallsAvailable(): number {
        return this.#stallsAvailable;
    }

    set stallsAvailable(value: number) {
        this.#stallsAvailable = value;
    }

    get isActive(): boolean {
        return this.#isActive;
    }

    set isActive(value: boolean) {
        this.#isActive = value;
    }

    get locationCoordinates() {
        return this.#locationCoordinates;
    }

    set locationCoordinates(value: { latitude: number; longitude: number; }) {
        this.#locationCoordinates = value;
    }

}
