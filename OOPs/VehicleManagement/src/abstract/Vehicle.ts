import { MAX_LISTING_PRICE } from "../constants/vehicleConstants";
import type { VehicleStartResult } from "../types/VehicleStartResult";

export abstract class Vehicle {
  private _manufacturerName: string;
  private _modelName: string;
  private _manufacturingYear: number;
  private _listingPrice: number;

  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
  ) {
    this._manufacturerName = manufacturerName;
    this._modelName = modelName;
    this._manufacturingYear = manufacturingYear;
    this._listingPrice = this.validateListingPrice(listingPrice);
  }

  get manufacturerName(): string {
    return this._manufacturerName;
  }

  get modelName(): string {
    return this._modelName;
  }

  get manufacturingYear(): number {
    return this._manufacturingYear;
  }

  get listingPrice(): number {
    return this._listingPrice;
  }

  set listingPrice(newPrice: number) {
    this._listingPrice = this.validateListingPrice(newPrice);
  }

  abstract start(): VehicleStartResult;
  abstract stop(): void;

  private validateListingPrice(price: number): number {
    const isInvalid = price < 0 || price > MAX_LISTING_PRICE;
    if (isInvalid) {
      throw new RangeError(
        `Listing price must be between 0 and ${MAX_LISTING_PRICE} USD (got ${price}).`,
      );
    }
    return price;
  }
}
