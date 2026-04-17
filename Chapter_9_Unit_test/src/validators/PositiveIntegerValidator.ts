import { IInputValidator } from "../interfaces/IInputValidator";

export class PositiveIntegerValidator implements IInputValidator<number> {
  validate(value: number): void {
    const isValidPositiveInteger = Number.isInteger(value) && value >= 1;

    if (!isValidPositiveInteger) {
      throw new RangeError(
        `Expected a positive integer (>= 1), received: ${value}`
      );
    }
  }
}
