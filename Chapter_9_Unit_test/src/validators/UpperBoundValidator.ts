import { IInputValidator } from "../interfaces/IInputValidator";

export class UpperBoundValidator implements IInputValidator<number> {
  private static readonly MINIMUM_VALID_UPPER_BOUND = 2;

  validate(upperBound: number): void {
    const isValidUpperBound =
      Number.isInteger(upperBound) &&
      upperBound >= UpperBoundValidator.MINIMUM_VALID_UPPER_BOUND;

    if (!isValidUpperBound) {
      throw new RangeError(
        `Upper bound k must be an integer >= ${UpperBoundValidator.MINIMUM_VALID_UPPER_BOUND}, received: ${upperBound}`
      );
    }
  }
}
