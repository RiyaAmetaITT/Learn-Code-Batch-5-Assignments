import { MAX_LISTING_PRICE } from "../constants/vehicleConstants";

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
    this._listingPrice = this.ensureValidPrice(listingPrice);
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
    this._listingPrice = this.ensureValidPrice(newPrice);
  }
  abstract start(): void;
  abstract stop(): void;
  abstract displayInfo(): void;

  protected ensureValidPrice(priceToValidate: number): number {
    const isPriceNegative = priceToValidate < 0;
    const exceedsMaximumAllowedPrice = priceToValidate > MAX_LISTING_PRICE;

    if (isPriceNegative || exceedsMaximumAllowedPrice) {
      console.warn(
        `Invalid price $${priceToValidate} ignored. Price remains $${this._listingPrice ?? 0}.`,
      );
      return this._listingPrice ?? 0;
    }
    return priceToValidate;
  }
}
