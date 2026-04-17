import { IDivisorCounter } from "../interfaces/IDivisorCounter";
import { IInputValidator } from "../interfaces/IInputValidator";

export class PositiveDivisorCounter implements IDivisorCounter {
  constructor(
    private readonly positiveIntegerValidator: IInputValidator<number>
  ) {}

  count(n: number): number {
    this.positiveIntegerValidator.validate(n);

    let divisorCount = 0;

    for (let divisor = 1; divisor * divisor <= n; divisor++) {
      const isDivisorOfN = n % divisor === 0;

      if (isDivisorOfN) {
        const isPerfectSquareRoot = divisor * divisor === n;
        divisorCount += isPerfectSquareRoot ? 1 : 2;
      }
    }

    return divisorCount;
  }
}
